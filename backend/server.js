const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

// Loading environment variables from the project root or backend folder
const envPaths = [
  path.join(__dirname, "../.env"),
  path.join(__dirname, ".env"),
];
const envPath = envPaths.find((candidate) => fs.existsSync(candidate));
if (envPath) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config();
}

const express = require("express");

// Importing routes
const userRoutes = require("./routes/users");
const itemRoutes = require("./routes/items");
const notificationRoutes = require("./routes/notifications");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});
app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/notifications", notificationRoutes);

const frontendBuildPath = path.join(__dirname, "../frontend/dist");
if (fs.existsSync(frontendBuildPath)) {
  app.use(express.static(frontendBuildPath));

  app.use((req, res, next) => {
    if (req.method !== "GET") {
      return next();
    }

    if (
      req.path.startsWith("/api") ||
      req.path.startsWith("/uploads") ||
      req.path === "/health"
    ) {
      return next();
    }

    res.sendFile(path.join(frontendBuildPath, "index.html"));
  });
}

app.use((err, _req, res, _next) => {
  console.error(err);

  // Handle multer errors (file upload errors)
  if (err.name === "MulterError") {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ message: "File size too large. Maximum size is 5MB." });
    }
    return res
      .status(400)
      .json({ message: err.message || "File upload error." });
  }

  res.status(500).json({ message: "Internal server error." });
});

app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});
