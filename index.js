const { Builder, By, Key, until } = require("selenium-webdriver");
require('dotenv').config();

async function ticketlink() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://www.ticketlink.co.kr/");

    const homepage = await driver.getWindowHandle();

    await driver.findElement(By.id('loginBtn')).click();

    let windows = await driver.getAllWindowHandles();
    
    for (const window of windows) {
      if(window !== homepage){
        driver.switchTo().window(window)
        break;
      }
    }
    
    await driver.findElement(By.id('id')).sendKeys(`${process.env.TL_ID}`, Key.RETURN);

    // console.log('windows[0]', windows[0])

    // await driver.wait(until.ableToSwitchToFrame())
    console.log('here')
    // driver.switchTo().window('window')

    // await driver.findElement(By.id('id')).sendKeys('abcd', Key.RETURN);

  } catch (error) {
      console.log('error', error)
  } finally {
    // await driver.quit();
  }
}

ticketlink();
