const { Builder, By, Key, until } = require('selenium-webdriver');

async function basicSearch() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Open Selenium wiki page
        await driver.get('https://en.wikipedia.org/wiki/Selenium_%28software%29');

        // Find Title of the page
        const title = driver.getTitle()

        console.log("Page title:", await title);
    } finally {
        // Close the browser
        await driver.quit();
    }
}

basicSearch();