const expect = require ('expect');
const {Then} = require('cucumber');
const locators = require ('../locators/locators');

Then(/^I expect that the element "([^"]*)?" contains text "([^"]*)?"$/, (selector, text) => {

    // get the value from json object
    selector = eval (selector);

    // convert it to a webdriver element
    const element = $(`${selector}`);

    // compare the text of element with the prvided text
    expect (element.getText()).toEqual(text);

});