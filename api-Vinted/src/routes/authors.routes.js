const express = require('express');
const router = express.Router();
const { getAuthors, createAuthor } = require('../controllers/authors.controller');

router.get('/', getAuthors);
router.post('/', createAuthor);

module.exports = router;