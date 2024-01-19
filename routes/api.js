const express = require('express');
const router = express.Router();
const searchService = require('../service/search');

router.get('/search', function (req, res, next) {
  const searchText = req.query.searchText !== undefined ? String(req.query.searchText).trim() : '';

  console.log('Search initiated with text: ' + searchText);

  searchService.searchByName(searchText, function (err, ret) {
    if (err) {
      console.error('Error in search:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Securely handle search results
      const sanitizedResults = sanitizeSearchResults(ret);
      res.json(sanitizedResults);
    }
  });
});

function sanitizeSearchResults(results) {
  // Implement secure handling of search results
  if (results && results.searchText) {
    // Remove sensitive information
    delete results.searchText;
  }
  return results;
}

module.exports = router;
