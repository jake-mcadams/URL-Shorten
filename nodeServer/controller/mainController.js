const ShortUrl = require("../model/shortUrl");
const { nanoid } = require('nanoid')


exports.getUrls = async (req, res, next)=>{
    // const shortUrls = await ShortUrl.find();
    const urlID = nanoid(10);
    res.json({shorrId: urlID})
}

exports.getUrlsDB = async (req, res, next)=>{
    const shortUrls = await ShortUrl.find();
    res.json({shortUrl: shortUrls})
}