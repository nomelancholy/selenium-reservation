const { Builder, By, Key, until } = require("selenium-webdriver");
require("dotenv").config();

async function ticketlink() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // await driver.get("http://www.ticketlink.co.kr/sports/football/77");
    await driver.get("http://www.ticketlink.co.kr/sports/baseball/57");

    // click login btn
    const homepage = await driver.getWindowHandle();
    await driver.findElement(By.id("loginBtn")).click();

    // driver switch to popup
    let windows = await driver.getAllWindowHandles();

    for (const window of windows) {
      if (window !== homepage) {
        driver.switchTo().window(window);
        break;
      }
    }

    // enter id & pw
    await driver
      .findElement(By.id("id"))
      .sendKeys(`${process.env.TL_ID}`, Key.RETURN);
    await driver
      .findElement(By.id("pw"))
      .sendKeys(`${process.env.TL_PW}`, Key.ENTER);

    // driver switch to hompage
    await driver.switchTo().window(homepage);

    // click reservation button
    elements = await driver.findElements(By.className("btn_reserve"));
    await elements[0].click();
    await driver.findElement(By.id("noticeModalClose")).click();

    // driver switch to popup
    windows = await driver.getAllWindowHandles();

    for (const window of windows) {
      if (window !== homepage) {
        driver.switchTo().window(window);
        break;
      }
    }

    // 좌석 클릭
    await driver
      .findElement(By.xpath("//*[text()[contains(.,'VIP석')]]"))
      .click();
    await driver
      .findElement(By.xpath("//*[text()[contains(.,'VIP2구역')]]"))
      .click();

    // className이 reserve_next3 에서 reserve_next2로 바뀔때까지 (좌석 클릭할 때 까지) 기다리다 순서 진행

    let disabledNextButton = await driver.findElement(By.css(".reserve_next3"));

    await driver.wait(() => {
      // to do - add until by condition
    },3000);

    await driver.findElement(By.css(".reserve_next2")).click();
  } catch (error) {
    console.log("error", error);
  } finally {
    // await driver.quit();
  }
}

ticketlink();
