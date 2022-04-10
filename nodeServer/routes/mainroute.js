const express = require('express');
const router = express.Router();
const mainController = require('../controller/mainController');

// router.get("/ShortUrl", mainController.getUrls);
router.get("/:shortUrl", mainController.getUrlsDB);
router.post("/ShortUrl", mainController.addUrl)
// router.get("/ShortUrl", mainController.getUrls);
// router.post("/shortUrls", mainController.urlLength);

module.exports = router;

