Feature: Product Intelligence Tracking
  As a product manager
  I want to monitor competitor product features and pricing
  So that I can understand our competitive position and make strategic decisions

  Background:
    Given the system has competitor products cataloged
    And feature taxonomy has been defined for the product category

  Scenario: Add a new competitor product
    Given I am on the product intelligence dashboard
    When I add a new product with the following details:
      | attribute         | value                     |
      | name              | CompetitorX Pro           |
      | company           | CompetitorX               |
      | launch date       | 2023-08-15                |
      | primary segment   | Enterprise                |
    Then the product should be added to the system
    And the product should be flagged for feature discovery
    And an initial benchmark score should be calculated

  Scenario: Track new feature release by competitor
    Given a product "CompetitorA Plus" exists in the system
    When I record a new feature with the following details:
      | attribute         | value                           |
      | name              | AI-Powered Recommendations      |
      | description       | Uses ML to suggest actions      |
      | release date      | 2023-09-01                      |
      | pricing tier      | Premium                         |
    Then the feature should be added to the product
    And a historical change record should be created
    And an alert should be triggered for the product team
    And the competitive analysis should be flagged for update

  Scenario Outline: Compare pricing structures across competitors
    Given products from the following competitors exist:
      | competitor    |
      | CompetitorA   |
      | CompetitorB   |
      | CompetitorC   |
    When I generate a pricing comparison for tier "<tier>"
    Then I should see a comparison of all pricing components
    And I should see feature availability at each price point
    And I should see a value assessment score

    Examples:
      | tier          |
      | Free          |
      | Professional  |
      | Enterprise    |

  Scenario: Create market map positioning
    Given I have selected the following products for comparison:
      | product          |
      | OurProduct       |
      | CompetitorA Plus |
      | CompetitorB Pro  |
    When I create a market map with axes:
      | axis            | values                       |
      | X-Axis          | Basic → Advanced Features    |
      | Y-Axis          | Low → High Price             |
    Then each product should be positioned on the map
    And the position should reflect their feature set and pricing
    And I should be able to view historical position changes