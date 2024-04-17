
const express = require('express');
const languageRoutes = express.Router();

languageRoutes.post('/set_language', (req, res) => {
    const { language } = req.body;
    if (!language) {
      return res.status(400).json({ error: 'Language information is missing' });
    }
    req.i18n.changeLanguage(language, (err, t) => {
      if (err) {
        console.error('Error setting language:', err);
        return res.status(500).json({ error: 'Failed to set language' });
      }
      res.status(200).json({ message: 'Language set successfully' });
    });
  });

  module.exports = languageRoutes;