const express = require("express");
const Parser = require("rss-parser");
const parser = new Parser();
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/news", async (req, res) => {
  const url = "https://www.vedomosti.ru/rss/news";
  try {
    const feed = await parser.parseURL(url);
    res.json(feed);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch RSS feed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on:
    - http://localhost:${PORT}/
    - http://localhost:${PORT}/news`);
});
