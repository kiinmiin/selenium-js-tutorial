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

        let sonum = await driver.wait(
            until.elementLocated(By.name('')), 
            3000
        );

        console.log("Tulemus: ", await sonum.getText());
    } finally {
        // Close the browser
        await driver.quit();
    }
}

basicSearch();