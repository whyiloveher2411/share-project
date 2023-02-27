const express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs');
const app = express();
const port = 3000;
const folderName = 'static';

app.get(/.*/, (req, res) => {

    const url = req.url;

    try {
        const data = fs.readFileSync(folderName + url + '.html', 'utf8');
        res.send(data);
    } catch (err) {
        res.send('HTML saved to file!2');
    }

    res.send('HTML saved to file!2');
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})