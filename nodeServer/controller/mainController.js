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

exports.addUrl = async (req, res, next) => {
    if (req.body.fullUrl === null || req.body.fullUrl == "") {
      res.sendStatus(404);
    }
    await ShortUrl.create({ full: req.body.fullUrl });
    // res.redirect("/");
    // res.json({shortUrl: 'testing'})
    // console.log(req.body)
  };