const locators = require ('../locators/locators');
const {When} = require('cucumber');

When (/^I touch the button "([^"]*)?"$/, selector => {

    // pause to load all the elelemnts in page
    browser.pause (3000);

    // get the locator value for JSON object
    selector = eval (selector);

    // convert it to a webdriver element
    const element = $(`${selector}`);

    // check if the ellemnt exists
    if (element.isExisting ()){
        // tap on the element
        element.click ();
    }

});

When (/^I pause the execution for "([\d]+)" seconds$/, (time) => {

    // pause the execution
    browser.pause (time*1000);

});