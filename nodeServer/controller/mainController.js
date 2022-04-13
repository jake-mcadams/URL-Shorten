// const ShortUrl = require("../model/shortUrl");
import shortUrl from '../model/shortUrl.js';
// const { nanoid } = require('nanoid');
import { nanoid } from 'nanoid';
import prependHttp from 'prepend-http';


const getUrls = async (req, res, next)=>{
    // const shortUrls = await ShortUrl.find();
    const urlID = nanoid(10);
    res.json({shorrId: urlID})
}

const getUrlsDB = async (req, res, next)=>{
    const shortUrls = await ShortUrl.find();
    res.json({shortUrl: shortUrls})
}

const addUrl = async (req, res, next) => {
    if (req.body.fullUrl === null || req.body.fullUrl == "") {
      res.sendStatus(404);
    }
    // await ShortUrl.create({ full: req.body.fullUrl });
    // if(!req.body.hasProtocol){

    // }
    console.log(req.body.hasProtocol)

  };

  export { getUrls, getUrlsDB, addUrl};