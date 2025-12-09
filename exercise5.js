const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');

async function basicSearch() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Open DuckDuckGo
        await driver.get('https://www.demoblaze.com');

        // Type 'Selenium WebDriver' into the search box and press Enter
        const results = await driver.findElements(By.id('itemc'))

        const laptop = results[1];

        await laptop.click();

        await driver.sleep(2000);

        const items = await driver.findElements(By.className('hrefch'));

        const tulemused = items.slice(0, 7);

        const nimed = await Promise.all(tulemused.map(async (el) => {
            const title = await el.getText();
            const href = await el.getAttribute('href');
            return { title, href };
        }));

        console.log('Tulemused:');
        nimed.forEach((it, i) => console.log(`#${i+1} ${it.title} -> ${it.href}`));

    const filepath = path.join(__dirname, 'screenshot.png');
    const image = await driver.takeScreenshot();
    fs.writeFileSync(filepath, image, 'base64');
        console.log('Screenshot saved to', filepath);
    } finally {
        await driver.quit();
    }
}

basicSearch();