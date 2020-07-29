const { Builder, By, Key, until } = require("selenium-webdriver");
require("dotenv").config();

async function ticketlink() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://www.ticketlink.co.kr/sports/football/77");
    // await driver.get("http://www.ticketlink.co.kr/sports/baseball/57");

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

    // To-Do

    // 예매 시간이 될 때 까지 대기하는 로직 추가

    // click reservation button
    let reserveStartButtons = await driver.findElements(
      By.className("btn_reserve")
    );
    await reserveStartButtons[0].click();
    await driver.findElement(By.id("noticeModalClose")).click();

    // driver switch to popup
    windows = await driver.getAllWindowHandles();

    for (const window of windows) {
      if (window !== homepage) {
        driver.switchTo().window(window);
        break;
      }
    }

    // 좌석 메뉴 클릭
    await driver
      .findElement(By.xpath("//*[text()[contains(.,'S 지정석')]]"))
      .click();
    await driver
      .findElement(By.xpath("//*[text()[contains(.,'S 4구역')]]"))
      .click();

    // 좌석 클릭할 때 까지 기다렸다 진행

    await driver.wait(until.alertIsPresent());

    await driver.switchTo().alert().accept();

    await driver.switchTo(homepage);

    // await driver.wait(until.elementLocated(By.className("reserve_next2")));

    await driver.findElement(By.className("reserve_next2")).click();

    // 권종/할인/매수 선택

    await driver.wait(until.elementLocated(By.className("selectbox")));

    let selectboxes = await driver.findElements(By.className("selectbox"));
    await selectboxes[0].click();

    await driver
      .findElement(By.css('li[data-sale_price="12000"][data-value="1"]'))
      .click();

    await driver.findElement(By.id("reserveNext")).click();

    // 배송선택/예매확인

    await driver.wait(until.elementsLocated(By.className("checkbox")));

    let checkboxes = await driver.findElements(By.className("checkbox"));

    for (const checkbox of checkboxes) {
      checkbox.click();
    }

    await driver.findElement(By.className("reserve_pay4")).click();
  } catch (error) {
    console.log("error", error);
  } finally {
    // await driver.quit();
  }
}

ticketlink();
