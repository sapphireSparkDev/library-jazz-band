import fs from "fs/promises";
import path from "path";
import { getStore } from "@netlify/blobs";

// Helper function to get data from Netlify Blobs or fallback to JSON files
const readJSONFile = async (filename, context) => {
  try {
    // In production (Netlify), use Blobs storage
    if (context && process.env.NETLIFY) {
      const store = getStore({ name: "data", siteID: context.site?.id });
      const data = await store.get(filename, { type: "json" });

      if (data) {
        console.log(`Successfully read ${filename} from Netlify Blobs`);
        return data;
      }

      // If blob doesn't exist, try to initialize from static file
      const fallbackData = await readFromStaticFiles(filename);
      if (fallbackData && fallbackData.length > 0) {
        // Save to blob for future use
        await store.setJSON(filename, fallbackData);
        console.log(
          `Initialized ${filename} in Netlify Blobs from static files`,
        );
        return fallbackData;
      }

      return [];
    }

    // In development, read from filesystem
    return await readFromStaticFiles(filename);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    // Try fallback to static files
    try {
      return await readFromStaticFiles(filename);
    } catch (fallbackError) {
      console.error(`Fallback also failed for ${filename}:`, fallbackError);
      return [];
    }
  }
};

// Helper to read from static JSON files
const readFromStaticFiles = async (filename) => {
  const possiblePaths = [
    path.join(process.cwd(), "src", "data", filename),
    path.join(process.cwd(), "dist", "src", "data", filename),
    path.join(
      import.meta.url.replace("file://", ""),
      "..",
      "..",
      "..",
      "src",
      "data",
      filename,
    ),
    path.join(
      import.meta.url.replace("file://", ""),
      "..",
      "..",
      "..",
      "dist",
      "src",
      "data",
      filename,
    ),
  ];

  for (const filePath of possiblePaths) {
    try {
      const data = await fs.readFile(filePath, "utf8");
      console.log(`Successfully read ${filename} from: ${filePath}`);
      return JSON.parse(data);
    } catch (err) {
      // Try next path
      continue;
    }
  }

  console.error(`Could not find ${filename} in any of the expected locations`);
  return [];
};

// Helper function to write JSON files to Netlify Blobs or filesystem
const writeJSONFile = async (filename, data, context) => {
  try {
    // In production (Netlify), use Blobs storage
    if (context && process.env.NETLIFY) {
      const store = getStore({ name: "data", siteID: context.site?.id });
      await store.setJSON(filename, data);
      console.log(`Successfully wrote ${filename} to Netlify Blobs`);
      return true;
    }

    // In development, write to filesystem
    const filePath = path.join(process.cwd(), "src", "data", filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    console.log(`Successfully wrote ${filename} to: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    return false;
  }
};

export default async (req, context) => {
  const { pathname } = new URL(req.url);
  const method = req.method;

  console.log(`API Request: ${method} ${pathname}`);

  // Handle CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Content-Type": "application/json",
  };

  // Handle preflight requests
  if (method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers,
    });
  }

  try {
    // Events API Routes
    if (pathname === "/api/events" && method === "GET") {
      const events = await readJSONFile("events.json", context);
      return new Response(JSON.stringify(events), {
        status: 200,
        headers,
      });
    }

    if (pathname.startsWith("/api/events/") && method === "GET") {
      const slug = pathname.split("/").pop();
      const events = await readJSONFile("events.json", context);
      const event = events.find((e) => e.slug === slug);

      if (!event) {
        return new Response(JSON.stringify({ error: "Event not found" }), {
          status: 404,
          headers,
        });
      }

      return new Response(JSON.stringify(event), {
        status: 200,
        headers,
      });
    }

    if (pathname === "/api/events" && method === "POST") {
      const body = await req.json();
      const events = await readJSONFile("events.json", context);
      const newEvent = {
        ...body,
        id: body.id || `event-${Date.now()}`,
        isUpcoming: new Date(body.date) >= new Date(),
      };

      events.push(newEvent);
      const success = await writeJSONFile("events.json", events, context);

      if (success) {
        return new Response(JSON.stringify(newEvent), {
          status: 201,
          headers,
        });
      } else {
        return new Response(
          JSON.stringify({ error: "Failed to create event" }),
          {
            status: 500,
            headers,
          },
        );
      }
    }

    if (pathname.startsWith("/api/events/") && method === "PUT") {
      const id = pathname.split("/").pop();
      const body = await req.json();
      const events = await readJSONFile("events.json", context);
      const eventIndex = events.findIndex((e) => e.id === id);

      if (eventIndex === -1) {
        return new Response(JSON.stringify({ error: "Event not found" }), {
          status: 404,
          headers,
        });
      }

      const updatedEvent = {
        ...body,
        id: id,
        isUpcoming: new Date(body.date) >= new Date(),
      };

      events[eventIndex] = updatedEvent;
      const success = await writeJSONFile("events.json", events, context);

      if (success) {
        return new Response(JSON.stringify(updatedEvent), {
          status: 200,
          headers,
        });
      } else {
        return new Response(
          JSON.stringify({ error: "Failed to update event" }),
          {
            status: 500,
            headers,
          },
        );
      }
    }

    if (pathname.startsWith("/api/events/") && method === "DELETE") {
      const id = pathname.split("/").pop();
      const events = await readJSONFile("events.json", context);
      const filteredEvents = events.filter((e) => e.id !== id);

      if (events.length === filteredEvents.length) {
        return new Response(JSON.stringify({ error: "Event not found" }), {
          status: 404,
          headers,
        });
      }

      const success = await writeJSONFile(
        "events.json",
        filteredEvents,
        context,
      );

      if (success) {
        return new Response(
          JSON.stringify({ message: "Event deleted successfully" }),
          {
            status: 200,
            headers,
          },
        );
      } else {
        return new Response(
          JSON.stringify({ error: "Failed to delete event" }),
          {
            status: 500,
            headers,
          },
        );
      }
    }

    // Musicians API Routes
    if (pathname === "/api/musicians" && method === "GET") {
      const musicians = await readJSONFile("musicians.json", context);
      return new Response(JSON.stringify(musicians), {
        status: 200,
        headers,
      });
    }

    if (pathname === "/api/musicians" && method === "POST") {
      const body = await req.json();
      const musicians = await readJSONFile("musicians.json", context);
      const newMusician = {
        ...body,
        id: body.id || `musician-${Date.now()}`,
      };

      musicians.push(newMusician);
      const success = await writeJSONFile("musicians.json", musicians, context);

      if (success) {
        return new Response(JSON.stringify(newMusician), {
          status: 201,
          headers,
        });
      } else {
        return new Response(
          JSON.stringify({ error: "Failed to create musician" }),
          {
            status: 500,
            headers,
          },
        );
      }
    }

    if (pathname.startsWith("/api/musicians/") && method === "PUT") {
      const id = pathname.split("/").pop();
      const body = await req.json();
      const musicians = await readJSONFile("musicians.json", context);
      const musicianIndex = musicians.findIndex((m) => m.id === id);

      if (musicianIndex === -1) {
        return new Response(JSON.stringify({ error: "Musician not found" }), {
          status: 404,
          headers,
        });
      }

      const updatedMusician = {
        ...body,
        id: id,
      };

      musicians[musicianIndex] = updatedMusician;
      const success = await writeJSONFile("musicians.json", musicians, context);

      if (success) {
        return new Response(JSON.stringify(updatedMusician), {
          status: 200,
          headers,
        });
      } else {
        return new Response(
          JSON.stringify({ error: "Failed to update musician" }),
          {
            status: 500,
            headers,
          },
        );
      }
    }

    if (pathname.startsWith("/api/musicians/") && method === "DELETE") {
      const id = pathname.split("/").pop();
      const musicians = await readJSONFile("musicians.json", context);
      const filteredMusicians = musicians.filter((m) => m.id !== id);

      if (musicians.length === filteredMusicians.length) {
        return new Response(JSON.stringify({ error: "Musician not found" }), {
          status: 404,
          headers,
        });
      }

      const success = await writeJSONFile(
        "musicians.json",
        filteredMusicians,
        context,
      );

      if (success) {
        return new Response(
          JSON.stringify({ message: "Musician deleted successfully" }),
          {
            status: 200,
            headers,
          },
        );
      } else {
        return new Response(
          JSON.stringify({ error: "Failed to delete musician" }),
          {
            status: 500,
            headers,
          },
        );
      }
    }

    // Health check
    if (pathname === "/api/health" && method === "GET") {
      const events = await readJSONFile("events.json", context);
      const musicians = await readJSONFile("musicians.json", context);

      return new Response(
        JSON.stringify({
          status: "OK",
          message: "Server is running",
          eventsCount: events.length,
          musiciansCount: musicians.length,
          cwd: process.cwd(),
        }),
        {
          status: 200,
          headers,
        },
      );
    }

    // File upload endpoint
    if (pathname === "/api/upload" && method === "POST") {
      try {
        // Parse the multipart form data
        const formData = await req.formData();
        const file = formData.get("file");

        if (!file) {
          return new Response(JSON.stringify({ error: "No file provided" }), {
            status: 400,
            headers,
          });
        }

        // Get file details
        const filename = file.name;
        const timestamp = Date.now();
        const extension = filename.split(".").pop();
        const safeFilename = `${timestamp}-${filename.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

        // In production (Netlify), use Blobs storage for uploads
        if (context && process.env.NETLIFY) {
          const store = getStore({ name: "uploads", siteID: context.site?.id });

          // Convert file to buffer
          const buffer = await file.arrayBuffer();

          // Store the file in Netlify Blobs
          await store.set(safeFilename, buffer, {
            metadata: {
              contentType: file.type,
              originalName: filename,
              uploadedAt: new Date().toISOString(),
            },
          });

          // Return the blob URL
          const filePath = `/api/uploads/${safeFilename}`;

          return new Response(
            JSON.stringify({
              success: true,
              filePath: filePath,
              filename: safeFilename,
              originalName: filename,
            }),
            {
              status: 200,
              headers,
            },
          );
        } else {
          // In development, save to filesystem
          const uploadsDir = path.join(process.cwd(), "public", "uploads");

          // Create uploads directory if it doesn't exist
          try {
            await fs.mkdir(uploadsDir, { recursive: true });
          } catch (err) {
            // Directory might already exist
          }

          const filePath = path.join(uploadsDir, safeFilename);
          const buffer = Buffer.from(await file.arrayBuffer());
          await fs.writeFile(filePath, buffer);

          return new Response(
            JSON.stringify({
              success: true,
              filePath: `/uploads/${safeFilename}`,
              filename: safeFilename,
              originalName: filename,
            }),
            {
              status: 200,
              headers,
            },
          );
        }
      } catch (error) {
        console.error("File upload error:", error);
        return new Response(
          JSON.stringify({
            error: "File upload failed",
            message: error.message,
          }),
          {
            status: 500,
            headers,
          },
        );
      }
    }

    // Serve uploaded files from Netlify Blobs
    if (pathname.startsWith("/api/uploads/") && method === "GET") {
      try {
        const filename = pathname.split("/").pop();

        if (context && process.env.NETLIFY) {
          const store = getStore({ name: "uploads", siteID: context.site?.id });
          const fileData = await store.get(filename, { type: "arrayBuffer" });
          const metadata = await store.getMetadata(filename);

          if (!fileData) {
            return new Response(JSON.stringify({ error: "File not found" }), {
              status: 404,
              headers: {
                ...headers,
                "Content-Type": "application/json",
              },
            });
          }

          return new Response(fileData, {
            status: 200,
            headers: {
              "Content-Type":
                metadata?.contentType || "application/octet-stream",
              "Cache-Control": "public, max-age=31536000",
            },
          });
        } else {
          // In development, serve from filesystem
          const filePath = path.join(
            process.cwd(),
            "public",
            "uploads",
            filename,
          );

          try {
            const fileBuffer = await fs.readFile(filePath);

            // Determine content type from extension
            const ext = filename.split(".").pop()?.toLowerCase();
            const contentTypeMap = {
              jpg: "image/jpeg",
              jpeg: "image/jpeg",
              png: "image/png",
              gif: "image/gif",
              webp: "image/webp",
              mp4: "video/mp4",
              webm: "video/webm",
            };
            const contentType =
              contentTypeMap[ext] || "application/octet-stream";

            return new Response(fileBuffer, {
              status: 200,
              headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=31536000",
              },
            });
          } catch (err) {
            return new Response(JSON.stringify({ error: "File not found" }), {
              status: 404,
              headers: {
                ...headers,
                "Content-Type": "application/json",
              },
            });
          }
        }
      } catch (error) {
        console.error("File retrieval error:", error);
        return new Response(
          JSON.stringify({
            error: "File retrieval failed",
            message: error.message,
          }),
          {
            status: 500,
            headers,
          },
        );
      }
    }

    // Route not found
    return new Response(JSON.stringify({ error: "Route not found" }), {
      status: 404,
      headers,
    });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: error.message,
      }),
      {
        status: 500,
        headers,
      },
    );
  }
};

// Configure the function to handle all API routes
export const config = {
  path: "/api/*",
};
