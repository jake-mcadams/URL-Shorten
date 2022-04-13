// const express = require('express');
import express from 'express';;
const router = express.Router();
// const mainController = require('../controller/mainController');
import { getUrls, getUrlsDB, addUrl} from '../controller/mainController.js';

// router.get("/ShortUrl", mainController.getUrls);
router.get("/:shortUrl", getUrlsDB);
router.post("/ShortUrl", addUrl)
// router.get("/ShortUrl", mainController.getUrls);
// router.post("/shortUrls", mainController.urlLength);

// module.exports = router;
export default router;

