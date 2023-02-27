const express = require('express');
const axios = require('axios');
const fs = require('fs');
const app = express();
const port = 3000;

app.get(/.*/, async (req, res) => {

    const userAgent = req.headers['user-agent'];
    const bots = [
        /googlebot/i,
        /bingbot/i,
        /yahoo! slurp/i,
        /duckduckbot/i,
        /baiduspider/i,
        /yandexbot/i,
        /sogou/i,
        /exabot/i,
        /facebot/i,
        /twitterbot/i
    ];

    const isBot = bots.some(bot => bot.test(userAgent));

    if (isBot) {
        const url = req.url;
        try {
            console.log('https://api.spacedev.vn/static' + url + '.html');
            const response = await axios.get('https://api.spacedev.vn/static' + url + '.html');
            const text = response.data;
            res.send(text);
        } catch (err) {
            console.log(err);
            res.send('HTML');
        }
    }else{
        res.send('HTML website');
    }
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})