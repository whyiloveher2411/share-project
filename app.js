const express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs');
const app = express();
const port = 3000;

app.get('/(.*)', (req, res) => {
    res.send('HTML saved to file!2');
})


app.get('/_prev-static', (req, res) => {

    const folderName = 'static';

    // check if folder exists
    if (!fs.existsSync(folderName)) {
        // create folder if it doesn't exist
        fs.mkdirSync(folderName);
    }

    (async () => {

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://spacedev.vn/explore/loi-khuyen-danh-cho-nguoi-moi-bat-dau-lap-trinh-front-end', {
            waitUntil: 'networkidle0',
        });

        // Wait for the HTML to fully render
        await page.waitForSelector('html');

        const tagAs = await page.evaluate(() => {
            return document.querySelector('a');
        });

        console.log(tagAs);

        const html = await page.content();

        // Save the HTML to a file
        fs.writeFile(folderName + '/example.html', html, function (err) {
            if (err) throw err;
            res.send('HTML saved to file!')
        });

        await browser.close();
    })();

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})