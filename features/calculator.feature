Feature: Calculator
    As a user
    I can use Calculator
    So that I can perform calculation

    Scenario: Add two numbers
        Given I am on the calculator page
        When I tap number 1
        Then I tap plus operator
        Then I tap number 5
        Then the addition result is 6

    Scenario: Subtract two numbers
        Given I am on the calculator page
        When I tap number 6
        Then I tap minus operator
        Then I tap number 3
        Then the subtraction result is 3
