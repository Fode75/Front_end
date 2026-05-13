const db = require('../db');

const getAuthors = (req, res) => {
  const authors = db.prepare('SELECT * FROM authors').all(); 
  res.json(authors);   
};

const createAuthor = (req, res) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: "name est obligatoire" });
  }

  const stmt = db.prepare('INSERT INTO authors (name) VALUES (?)');
  const result = stmt.run(name);
  
  res.status(201).json({ id: result.lastInsertRowid, name });
};
module.exports = { getAuthors, createAuthor };