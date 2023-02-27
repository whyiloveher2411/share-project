const express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs');
const app = express();
const port = 3000;
const folderName = 'static';

const courses = [
    'front-end-zero',
    'react',
];
const explores = [
    'loi-khuyen-danh-cho-nguoi-moi-bat-dau-lap-trinh-front-end',
    'senior-la-gi-va-lam-sao-toi-co-the-tro-thanh-senior-developer',
];


app.get('/', (req, res) => {

    // check if folder exists
    if (!fs.existsSync(folderName)) {
        // create folder if it doesn't exist
        fs.mkdirSync(folderName);
    }

    (async () => {



        // check if folder exists
        if (!fs.existsSync(folderName + '/course')) {
            // create folder if it doesn't exist
            fs.mkdirSync(folderName + '/course');
        }

        // check if folder exists
        if (!fs.existsSync(folderName + '/explore')) {
            // create folder if it doesn't exist
            fs.mkdirSync(folderName + '/explore');
        }

        courses.forEach(slug => {
            createStaticFile('https://spacedev.vn/course/' + slug, folderName + '/course/' + slug + '.html');
        });

        explores.forEach(slug => {
            createStaticFile('https://spacedev.vn/explore/' + slug, folderName + '/explore/' + slug + '.html');
        });

    })();
    res.send('HTML saved to file!');
})


app.set('timeout', 600000); // Set timeout to 10 minutes

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


async function createStaticFile(domain, filename) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(60000);

    await page.goto(domain, {
        waitUntil: 'networkidle0',
    });

    // Wait for the HTML to fully render
    await page.waitForSelector('html');

    const html = await page.content();

    // Save the HTML to a file
    fs.writeFile(filename, html, function (err) {
        if (err) throw err;
        console.log(domain);
    });

    await browser.close();
}