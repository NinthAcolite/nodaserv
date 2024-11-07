const express = require("express");
const Parser = require("rss-parser");
const parser = new Parser();

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Welcome to the Yandex News Reader Service!");
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
  console.log(`Server is running on http://localhost:${PORT}/news`);
});
