Feature: Test the "Hello World" functionality 
    As a developer
    I should be able to tap on "Hello World" CTA

    Background:
       Given I Launch the application

    Scenario: I should see "Hello,world!" text after tapping on "Hello World" CTA
      When I touch the button "locators.home_page.menu.app"
        And I touch the button "locators.home_page.menu.activity"
        And I touch the button "locators.home_page.menu.hello_world"
        And I pause the execution for "2" seconds
      Then I expect that the element "locators.hello_world.text" contains text "Hello, World!"