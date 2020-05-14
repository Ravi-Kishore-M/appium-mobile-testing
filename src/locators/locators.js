module.exports = {
    home_page: {
        menu: {
            hello_world: 'android=new UiSelector().resourceId("android:id/text1").text("Hello World")',
            app: 'android=new UiSelector().resourceId("android:id/text1").text("App")',
            activity:'android=new UiSelector().resourceId("android:id/text1").text("Activity")'
        }
    },
    hello_world: {
        text: 'android=new UiSelector().resourceId("io.appium.android.apis:id/text").text("Hello, World!")'
    }
};