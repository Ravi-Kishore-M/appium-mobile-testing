const {Given} = require('cucumber');


Given (/^I Launch the application$/, ()=> {

    const element = $('android=new UiSelector().resourceId("android:id/text1").text("App")')

    // wait for the element on home page to visible
    element.waitForExist({ timeout: 5000 });
    
});