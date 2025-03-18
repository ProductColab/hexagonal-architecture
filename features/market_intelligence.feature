Feature: Market Intelligence Gathering
  As a competitive intelligence analyst
  I want to track market segments and industry trends
  So that I can anticipate competitor movements and identify opportunities

  Background:
    Given the system has defined market segments
    And the system has data sources configured for intelligence gathering

  Scenario: Define a new market segment
    Given I am on the market intelligence dashboard
    When I create a new market segment with the following details:
      | name           | Enterprise Healthcare         |
      | description    | Healthcare organizations with 1000+ employees |
      | annual value   | $50M                          |
      | growth rate    | 12%                           |
    Then the market segment should be added to the system
    And it should be available for association with products
    And it should appear on relevant market maps

  Scenario: Track industry trend impact on products
    Given the system has identified an industry trend "AI-Powered Analytics"
    And the trend has been active for 6 months
    When I associate the trend with market segment "Enterprise"
    Then the system should identify all products targeting this segment
    And each product should receive an impact assessment score
    And products should be ranked by adaptation level to the trend

  Scenario Outline: Map product presence across geographic regions
    Given a product "<product>" exists in the system
    When I view its geographic distribution
    Then I should see all regions where the product is available
    And for each region I should see localization status
    And for each region I should see regulatory compliance status

    Examples:
      | product       |
      | OurProduct    |
      | CompetitorA   |
      | CompetitorB   |

  Scenario: Create customer profile for target segment
    Given I am creating a customer profile
    When I define the profile with the following attributes:
      | attribute     | value                          |
      | title         | Healthcare IT Director         |
      | pain points   | Security, Compliance, Integration |
      | budget range  | $100K-$500K                    |
      | buying cycle  | 6-12 months                    |
    And I associate the profile with market segment "Enterprise Healthcare"
    Then the customer profile should be saved
    And the profile should be linked to the market segment
    And the profile should be available when analyzing product-market fit