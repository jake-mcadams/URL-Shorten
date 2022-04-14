// const ShortUrl = require("../model/shortUrl");
import ShortUrl from "../model/shortUrl.js";
// const { nanoid } = require('nanoid');
import { nanoid } from "nanoid";
import prependHttp from "prepend-http";

const getUrls = async (req, res, next) => {
  // const shortUrls = await ShortUrl.find();
  const urlID = nanoid(10);
  res.json({ shorrId: urlID });
};

const getUrlsDB = async (req, res, next) => {
  const shortUrls = await ShortUrl.find();
  if(Object.keys(shortUrls).length === 0){
    console.log('No urls in DB')
  } else {
    console.log(shortUrls)
    console.log(typeof(shortUrls))
    res.json({ shortUrl: shortUrls });
  }
};

const addUrl = async (req, res, next) => {
  if (req.body.fullUrl === null || req.body.fullUrl == "") {
    res.sendStatus(404);
  }

  console.log(req.body.fullUrl);
  if (!req.body.hasProtocol) {
    console.log(`Received url: ${req.body.fullUrl}`)
    let prePendUrl = prependHttp(req.body.fullUrl);
    await ShortUrl.create({ full: prePendUrl });
  } else {
    console.log(`Received url: ${req.body.fullUrl}`)
    await ShortUrl.create({ full: req.body.fullUrl });
  }
};

export { getUrls, getUrlsDB, addUrl };
