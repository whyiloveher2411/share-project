const puppeteer = require('puppeteer');
const fs = require('fs');
const folderName = 'static';

const courses = [
    'front-end-zero',
    'react',
];
const explores = [
    'loi-khuyen-danh-cho-nguoi-moi-bat-dau-lap-trinh-front-end',
    'senior-la-gi-va-lam-sao-toi-co-the-tro-thanh-senior-developer',
];


// check if folder exists
if (!fs.existsSync(folderName)) {
    // create folder if it doesn't exist
    fs.mkdirSync(folderName);
}


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