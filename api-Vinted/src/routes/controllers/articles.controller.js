const db = require('../db');

const getArticles = (req, res) => {
  const articles = db.prepare('SELECT * FROM articles').all();
  res.json(articles);
};

const createArticle = (req, res) => {
  const { title, content, author_id } = req.body;

  if (!title || !content || !author_id) {
    return res.status(400).json({ error: "Champs manquants" });
  }

  const result = db.prepare('INSERT INTO articles (title, content, author_id) VALUES (?, ?, ?)').run(title, content, author_id);
  res.status(201).json({ id: result.lastInsertRowid, title, content, author_id });
};

module.exports = { getArticles, createArticle };