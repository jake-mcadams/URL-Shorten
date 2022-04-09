const express = require("express");
const app = express();
const mainRoute = require("./routes/mainroute");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/urlShortener", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5500");
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  next();
});

app.use(mainRoute);

// app.get('/testing', (req, res, next)=>{
//     res.json({test: 'testing', another: 'testing'})

// })

// app.get("/something", (req, res, next) => {
//   res.json({ test: "testing", another: "testing" });
// });

app.listen("5000");
