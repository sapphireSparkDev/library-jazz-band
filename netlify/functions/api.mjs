import fs from "fs/promises";
import path from "path";

// Helper function to read JSON files
const readJSONFile = async (filename) => {
  try {
    // In Netlify functions, we need to use the correct path
    // Try multiple possible paths for different environments
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

    let data;
    for (const filePath of possiblePaths) {
      try {
        data = await fs.readFile(filePath, "utf8");
        console.log(`Successfully read ${filename} from: ${filePath}`);
        return JSON.parse(data);
      } catch (err) {
        // Try next path
        continue;
      }
    }

    console.error(
      `Could not find ${filename} in any of the expected locations`,
    );
    return [];
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return [];
  }
};

// Helper function to write JSON files
const writeJSONFile = async (filename, data) => {
  try {
    // Use the same path logic as readJSONFile
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
      const events = await readJSONFile("events.json");
      return new Response(JSON.stringify(events), {
        status: 200,
        headers,
      });
    }

    if (pathname.startsWith("/api/events/") && method === "GET") {
      const slug = pathname.split("/").pop();
      const events = await readJSONFile("events.json");
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
      const events = await readJSONFile("events.json");
      const newEvent = {
        ...body,
        id: body.id || `event-${Date.now()}`,
        isUpcoming: new Date(body.date) >= new Date(),
      };

      events.push(newEvent);
      const success = await writeJSONFile("events.json", events);

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
      const events = await readJSONFile("events.json");
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
      const success = await writeJSONFile("events.json", events);

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
      const events = await readJSONFile("events.json");
      const filteredEvents = events.filter((e) => e.id !== id);

      if (events.length === filteredEvents.length) {
        return new Response(JSON.stringify({ error: "Event not found" }), {
          status: 404,
          headers,
        });
      }

      const success = await writeJSONFile("events.json", filteredEvents);

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
      const musicians = await readJSONFile("musicians.json");
      return new Response(JSON.stringify(musicians), {
        status: 200,
        headers,
      });
    }

    if (pathname === "/api/musicians" && method === "POST") {
      const body = await req.json();
      const musicians = await readJSONFile("musicians.json");
      const newMusician = {
        ...body,
        id: body.id || `musician-${Date.now()}`,
      };

      musicians.push(newMusician);
      const success = await writeJSONFile("musicians.json", musicians);

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
      const musicians = await readJSONFile("musicians.json");
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
      const success = await writeJSONFile("musicians.json", musicians);

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
      const musicians = await readJSONFile("musicians.json");
      const filteredMusicians = musicians.filter((m) => m.id !== id);

      if (musicians.length === filteredMusicians.length) {
        return new Response(JSON.stringify({ error: "Musician not found" }), {
          status: 404,
          headers,
        });
      }

      const success = await writeJSONFile("musicians.json", filteredMusicians);

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
      const events = await readJSONFile("events.json");
      const musicians = await readJSONFile("musicians.json");

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

    // File upload endpoint (placeholder for now)
    if (pathname === "/api/upload" && method === "POST") {
      return new Response(
        JSON.stringify({
          success: true,
          message:
            "File upload functionality is not available in production yet",
        }),
        {
          status: 200,
          headers,
        },
      );
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
