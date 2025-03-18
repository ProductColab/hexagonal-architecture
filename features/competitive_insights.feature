Feature: Competitive Intelligence Alerts and Insights
  As a business strategist
  I want to receive alerts about competitor changes and strategic insights
  So that I can respond quickly to market movements

  Background:
    Given the system is monitoring competitors
    And alert preferences are configured

  Scenario: Configure competitive intelligence alerts
    Given I am on the alert configuration page
    When I set up alerts with the following parameters:
      | parameter         | value                     |
      | alert type        | Product Change            |
      | competitors       | CompetitorA, CompetitorB  |
      | importance        | High                      |
      | delivery method   | Email, Dashboard          |
    Then the alert configuration should be saved
    And a confirmation message should be displayed
    And a test alert should be generated to verify setup

  Scenario: Receive alert for competitor pricing change
    Given an alert configuration exists for "Pricing Changes"
    When competitor "CompetitorA" changes their pricing structure
    And the data source reliability is "High"
    Then an alert should be generated within 24 hours
    And the alert should include:
      | information           |
      | Previous pricing      |
      | New pricing           |
      | Percentage change     |
      | Affected tiers        |
      | Data source reference |

  Scenario Outline: Generate strategic insights based on alert type
    Given an alert has been triggered for "<alert type>"
    When I request strategic insights for this alert
    Then the system should generate insights with:
      | attribute              |
      | Potential impact       |
      | Recommended response   |
      | Urgency level          |
      | Supporting data        |
    And the insights should be specific to the "<alert type>"

    Examples:
      | alert type                 |
      | New Competitor Entry       |
      | Feature Launch             |
      | Pricing Change             |
      | Market Segment Expansion   |

  Scenario: Track data source reliability
    Given I have added a new data source "Industry Blog X"
    When I record the following accuracy metrics:
      | metric          | value     |
      | true positives  | 15        |
      | false positives | 3         |
      | timeframe       | 6 months  |
    Then the data source should receive a reliability score
    And insights derived from this source should reflect the reliability score
    And alerts should include the reliability context