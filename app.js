const express = require('express');
const axios = require('axios');
const fs = require('fs');
const app = express();
const port = 3000;

app.get(/.*/, async (req, res) => {

    const url = req.url;
    try {
        console.log('https://api.spacedev.vn/static' + url + '.html');
        const response = await axios.get('https://api.spacedev.vn/static' + url + '.html');
        const text = response.data;
        res.send(text);
    } catch (err) {
        console.log(err);
        res.send('HTML saved to file!23');
    }

})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})