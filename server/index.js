const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../public/uploads");
    // Create directory if it doesn't exist
    fs.mkdir(uploadPath, { recursive: true })
      .then(() => cb(null, uploadPath))
      .catch((err) => cb(err));
  },
  filename: function (req, file, cb) {
    // Generate unique filename with timestamp
    const timestamp = Date.now();
    const safeFilename = `${timestamp}-${file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    cb(null, safeFilename);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: function (req, file, cb) {
    // Allow images and videos
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only image and video files are allowed"), false);
    }
  },
});

// Path to data files
const dataPath = path.join(__dirname, "../src/data");

// Helper function to read JSON files
const readJSONFile = async (filename) => {
  try {
    const filePath = path.join(dataPath, filename);
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return [];
  }
};

// Helper function to write JSON files
const writeJSONFile = async (filename, data) => {
  try {
    const filePath = path.join(dataPath, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    return false;
  }
};

// Events API Routes

// GET all events
app.get("/api/events", async (req, res) => {
  try {
    const events = await readJSONFile("events.json");
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// GET single event by slug
app.get("/api/events/:slug", async (req, res) => {
  try {
    const events = await readJSONFile("events.json");
    const event = events.find((e) => e.slug === req.params.slug);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch event" });
  }
});

// POST create new event
app.post("/api/events", async (req, res) => {
  try {
    const events = await readJSONFile("events.json");
    const newEvent = {
      ...req.body,
      id: req.body.id || `event-${Date.now()}`,
      isUpcoming: new Date(req.body.date) >= new Date(),
    };

    events.push(newEvent);
    const success = await writeJSONFile("events.json", events);

    if (success) {
      res.status(201).json(newEvent);
    } else {
      res.status(500).json({ error: "Failed to create event" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to create event" });
  }
});

// PUT update event
app.put("/api/events/:id", async (req, res) => {
  try {
    const events = await readJSONFile("events.json");
    const eventIndex = events.findIndex((e) => e.id === req.params.id);

    if (eventIndex === -1) {
      return res.status(404).json({ error: "Event not found" });
    }

    const updatedEvent = {
      ...req.body,
      id: req.params.id,
      isUpcoming: new Date(req.body.date) >= new Date(),
    };

    events[eventIndex] = updatedEvent;
    const success = await writeJSONFile("events.json", events);

    if (success) {
      res.json(updatedEvent);
    } else {
      res.status(500).json({ error: "Failed to update event" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update event" });
  }
});

// DELETE event
app.delete("/api/events/:id", async (req, res) => {
  try {
    const events = await readJSONFile("events.json");
    const filteredEvents = events.filter((e) => e.id !== req.params.id);

    if (events.length === filteredEvents.length) {
      return res.status(404).json({ error: "Event not found" });
    }

    const success = await writeJSONFile("events.json", filteredEvents);

    if (success) {
      res.json({ message: "Event deleted successfully" });
    } else {
      res.status(500).json({ error: "Failed to delete event" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete event" });
  }
});

// Musicians API Routes

// GET all musicians
app.get("/api/musicians", async (req, res) => {
  try {
    const musicians = await readJSONFile("musicians.json");
    res.json(musicians);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch musicians" });
  }
});

// POST create new musician
app.post("/api/musicians", async (req, res) => {
  try {
    const musicians = await readJSONFile("musicians.json");
    const newMusician = {
      ...req.body,
      id: req.body.id || `musician-${Date.now()}`,
    };

    musicians.push(newMusician);
    const success = await writeJSONFile("musicians.json", musicians);

    if (success) {
      res.status(201).json(newMusician);
    } else {
      res.status(500).json({ error: "Failed to create musician" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to create musician" });
  }
});

// PUT update musician
app.put("/api/musicians/:id", async (req, res) => {
  try {
    const musicians = await readJSONFile("musicians.json");
    const musicianIndex = musicians.findIndex((m) => m.id === req.params.id);

    if (musicianIndex === -1) {
      return res.status(404).json({ error: "Musician not found" });
    }

    const updatedMusician = {
      ...req.body,
      id: req.params.id,
    };

    musicians[musicianIndex] = updatedMusician;
    const success = await writeJSONFile("musicians.json", musicians);

    if (success) {
      res.json(updatedMusician);
    } else {
      res.status(500).json({ error: "Failed to update musician" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update musician" });
  }
});

// DELETE musician
app.delete("/api/musicians/:id", async (req, res) => {
  try {
    const musicians = await readJSONFile("musicians.json");
    const filteredMusicians = musicians.filter((m) => m.id !== req.params.id);

    if (musicians.length === filteredMusicians.length) {
      return res.status(404).json({ error: "Musician not found" });
    }

    const success = await writeJSONFile("musicians.json", filteredMusicians);

    if (success) {
      res.json({ message: "Musician deleted successfully" });
    } else {
      res.status(500).json({ error: "Failed to delete musician" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete musician" });
  }
});

// File upload endpoint
app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Return the file path relative to the public directory for frontend use
    const filePath = `/uploads/${req.file.filename}`;

    res.json({
      success: true,
      filePath: filePath,
      filename: req.file.filename,
      originalName: req.file.originalname,
    });
  } catch (error) {
    console.error("File upload error:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

// Error handling for file uploads
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ error: "File too large. Maximum size is 10MB." });
    }
  }
  res.status(500).json({ error: error.message });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
