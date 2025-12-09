const { Builder, By, Key, until } = require('selenium-webdriver');

async function basicSearch() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Open html form page
        await driver.get('https://www.w3schools.com/html/html_forms.asp');

        await driver.findElement(By.css('button')).sendKeys(Key.ENTER);

        // Find insert fields
        await driver.findElement(By.name('firstname')).sendKeys('nautica');
        await driver.findElement(By.name('lastname')).sendKeys('malone', Key.ENTER);

        // Read values directly from the form inputs (reliable even if the page doesn't navigate)
        const fnameEl = await driver.findElement(By.name('firstname'));
        const lnameEl = await driver.findElement(By.name('lastname'));
        const fname = await fnameEl.getAttribute('value');
        const lname = await lnameEl.getAttribute('value');

        console.log('Tulemus: ', `fname=${fname}&lname=${lname}`);
    } finally {
        await driver.quit();
    }
}

basicSearch();