const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');

async function basicSearch() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Open DuckDuckGo
        await driver.get('https://www.duckduckgo.com');

        // Type 'Selenium WebDriver' into the search box and press Enter
        await driver.findElement(By.name('q')).sendKeys('Selenium WebDriver', Key.ENTER);

        const timeout = 3000;
        await driver.wait(async () => {
            const els = await driver.findElements(By.css('h2 a'));
            return els.length > 0;
        }, timeout);
        const results = await driver.findElements(By.css('h2 a'));

        const firstThree = results.slice(0, 3);

        const items = await Promise.all(firstThree.map(async (el) => {
            const title = await el.getText();
            const href = await el.getAttribute('href');
            return { title, href };
        }));

        console.log('Tulemused:');
        items.forEach((it, i) => console.log(`#${i+1} ${it.title} -> ${it.href}`));

    const filepath = path.join(__dirname, 'screenshot.png');
    const image = await driver.takeScreenshot();
    fs.writeFileSync(filepath, image, 'base64');
        console.log('Screenshot saved to', filepath);
    } finally {
        await driver.quit();
    }
}

basicSearch();