// Manual steps:
// npm init
// npm i puppeteer
// add IP to whitelist: https://help.salesforce.com/articleView?id=security_networkaccess.htm&type=5



const { Console } = require("console");
const puppeteer = require("puppeteer");

const credentials = {
    username: "__________",
    password: "___________"
  };

let scrape = (async () => {
    const browser = await puppeteer.launch({
      headless: false,
      userDataDir: "./userDataDir",
      args: ['--disable-web-security', '--disable-features=IsolateOrigins,site-per-process']
    });
  
    const page = await browser.newPage();
    await page.waitFor(1000);  
    const navigationPromise = page.waitForNavigation();  
    await page.goto("https://eu13.lightning.force.com/");  
    await page.setViewport({ width: 1516, height: 699 });  
    await navigationPromise;
    await page.waitFor(1000);

    await page.waitForSelector("body > #left #main");
    await page.click("body > #left #main");
    await page.waitFor(1000);
    await page.type(
      "#login_form > #usernamegroup > #username_container #username",
      credentials.username
    );
    await page.waitFor(1000);
  // password
    await page.waitForSelector("#wrapper > #content > #theloginform #password");
    await page.click("#wrapper > #content > #theloginform #password");
    await page.type(
      "#wrapper > #content > #theloginform #password",
      credentials.password
    );
    // ENTER login
    await page.waitForSelector("#wrapper > #content > #theloginform #Login");
    await page.click("#wrapper > #content > #theloginform #Login");
    await page.waitFor(2000); 
    // Search Setup
    await page.waitForSelector("#oneHeader > div.slds-global-header.slds-grid.slds-grid--align-spread > div.slds-global-header__item.slds-global-header__item--search > div > div > div.inputWrapper.slds-grid.slds-grid--align-center.slds-grid--vertical-align-center.slds-size--1-of-1 > div.autocompleteWrapper.slds-grow.slds-form-element__control > div");
    await page.waitFor(2000);
    await page.click("#oneHeader > div.slds-global-header.slds-grid.slds-grid--align-spread > div.slds-global-header__item.slds-global-header__item--search > div > div > div.inputWrapper.slds-grid.slds-grid--align-center.slds-grid--vertical-align-center.slds-size--1-of-1 > div.autocompleteWrapper.slds-grow.slds-form-element__control > div")
    await page.waitFor(2000);
    await page.type("#oneHeader > div.slds-global-header.slds-grid.slds-grid--align-spread > div.slds-global-header__item.slds-global-header__item--search > div > div > div.inputWrapper.slds-grid.slds-grid--align-center.slds-grid--vertical-align-center.slds-size--1-of-1 > div.autocompleteWrapper.slds-grow.slds-form-element__control > div", 'Email Services', {delay: 100});
    await page.waitFor(1000);
    // Select Option from Drop-Down
    await page.waitForSelector("#oneHeader > div.slds-global-header.slds-grid.slds-grid--align-spread > div.slds-global-header__item.slds-global-header__item--search > div > div > div.inputWrapper.slds-grid.slds-grid--align-center.slds-grid--vertical-align-center.slds-size--1-of-1 > div.autocompleteWrapper.slds-grow.slds-form-element__control > div > div > div.listContent > ul > li:nth-child(3)");
    await page.click("#oneHeader > div.slds-global-header.slds-grid.slds-grid--align-spread > div.slds-global-header__item.slds-global-header__item--search > div > div > div.inputWrapper.slds-grid.slds-grid--align-center.slds-grid--vertical-align-center.slds-size--1-of-1 > div.autocompleteWrapper.slds-grow.slds-form-element__control > div > div > div.listContent > ul > li:nth-child(3)");
    await page.waitForTimeout(1000);
    // New Email Service 
    
    // get adFrame 
    const adFrameHandle = await page.waitForSelector(".split-right iframe");
    console.log(adFrameHandle);
    const adFrame = await adFrameHandle.contentFrame(); 

    console.log(adFrame);
    const EMAIL_SELECTOR = '[id="thePage:theForm:create_new_function"]';
    await adFrame.waitForSelector(EMAIL_SELECTOR);
    await adFrame.click(EMAIL_SELECTOR);
    
    await page.waitFor(3000);
    // await browser.close();
    return '< < < LOOKS GOOD > > >'
    });
    

    scrape().then((value) => {
      console.log(value); 
      console.log ('!!!!!!!!!!!!!!!!!!!!')
    });
  
