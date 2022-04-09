const express = require('express');
const router = express.Router();
const mainController = require('../controller/mainController');

// router.get("/ShortUrl", mainController.getUrls);
router.get("/ShortUrl", mainController.getUrlsDB);

module.exports = router;

