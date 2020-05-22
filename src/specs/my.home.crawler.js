const wd = require('wd');
const parser = require('xml2json');
const fs = require('fs');
const _ = require ('lodash');

// Provide the android capabilities
const ANDROID_CAPS = {
    platformName: 'Android',
    platformVersion: '7.1.1',
    deviceName: 'Pixel',
    appPackage: 'io.appium.android.apis',
    app: 'apps/ApiDemos-debug.apk',
    avd: 'Pixel',
    ignoreunimportantviews: true
};

describe('My Android Crawler', async function () {

  let driver;
  
    this.timeout(800000);


  it('Should crawl through all CTA\'s in Home screen', async function () {

    // connect to appium server
    driver = await wd.promiseChainRemote({
    host: '127.0.0.1',
    port: 4723
    });


    // intiate a session
    await driver.init(ANDROID_CAPS);
    await driver.setImplicitWaitTimeout(20000);

    // get the source in xml format and covert it to JSON string
    var pageSource = parser.toJson(await driver.source());

    // to get the required format convert JSON string to and object and apply the format
    // writing to a local file to debug
    fs.writeFileSync('home-page-source.json', JSON.stringify(JSON.parse(pageSource), null, 4));

    // converting the JSON string to an JSON Object
    pageSource = JSON.parse (pageSource);

    // Method to crawl
    async function crawl(pageSource) {

        // Iterate the JSON object
        for (var key in pageSource) {

          if (pageSource.hasOwnProperty(key)) {

            var val = pageSource[key];
  
            // if the value is a nested JSON object
            if (typeof val === 'object') {
                // if the JSON object contains the key `content-desc`
                if (val.hasOwnProperty('content-desc')){

                    // get the element for the provided accessibilityId
                    let element = await driver.elementByAccessibilityId(`${val['content-desc']}`);
                    // tap on the element
                    await element.click();

                    console.log (`tapped on ${val['content-desc']}`);

                    // wait foe the page to load
                    await driver.setImplicitWaitTimeout(100000);

                    // take a screenshot and save it in screenshots folder
                    await fs.writeFileSync (`./screenshots/${val['content-desc']}.png`,await driver.takeScreenshot(), 'base64');

                    await driver.setImplicitWaitTimeout(100000);

                    // press a `Back` Button
                    await driver.pressKeycode(4);
                }

                // if object doesn't have `content-desc`
                else {
                  // crawl again
                  await crawl(val);
                }
            }
          }
        }
      }
      await crawl(pageSource);
  });
  
  // quit the session
  if (driver) {
    await driver.quit();
  }
});
