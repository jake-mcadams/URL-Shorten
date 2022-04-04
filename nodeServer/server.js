const express = require('express');
const app = express();

app.get('/testing', (req, res, next)=>{
    res.json({test: 'testing'})
})

app.listen('5000')