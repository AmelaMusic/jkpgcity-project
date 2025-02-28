const express = require("express");
const path = require("path");
const fs = require("fs"); 
const app = express();

const PORT = 3000;

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// API endpoint to get venues data from stores.json
app.get("/api/venues", (req, res) => {
  const filePath = path.join(__dirname, "../public/stores.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading stores.json:", err);
      res.status(500).json({ error: "Failed to load venues data" });
      return;
    }

    try {
      const venues = JSON.parse(data);
      res.json(venues);
    } catch (parseError) {
      console.error("Error parsing stores.json:", parseError);
      res.status(500).json({ error: "Failed to parse venues data" });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
