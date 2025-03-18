Feature: Competitive Analysis
  As a product strategist
  I want to compare products across multiple dimensions
  So that I can identify competitive advantages and gaps

  Background:
    Given the system has data for company "OurCompany"
    And the system has data for competitor "CompetitorA"
    And both companies have products in the same market segment

  Scenario: Create a new competitive analysis
    Given I am on the competitive analysis dashboard
    When I select product "OurProduct" from "OurCompany"
    And I select product "CompetingProduct" from "CompetitorA"
    And I select the following comparison dimensions:
      | dimension        |
      | Features         |
      | Pricing          |
      | UX               |
      | Market Segments  |
    And I click "Generate Analysis"
    Then a new competitive analysis should be created
    And the analysis should include comparison data for all selected dimensions
    And the analysis should have a timestamp for version tracking

  Scenario: Generate strategic insights from competitive analysis
    Given I have a competitive analysis comparing "OurProduct" and "CompetingProduct"
    And the analysis identifies 3 feature gaps
    When I request strategic insights
    Then the system should generate at least one strategic insight for each feature gap
    And each insight should have supporting data from the competitive analysis
    And insights should be categorized by priority

  Scenario Outline: Filter competitive analysis by market segment
    Given I have a competitive analysis comparing multiple products
    When I filter the analysis by market segment "<segment>"
    Then the analysis should only show data relevant to the "<segment>" market segment
    And feature comparisons should be weighted by importance to the "<segment>"

    Examples:
      | segment        |
      | Enterprise     |
      | SMB            |
      | Consumer       |

  Scenario: Track historical changes in competitive position
    Given I have competitive analyses for "CompetitorA" from the following dates:
      | date       |
      | 2023-01-01 |
      | 2023-04-01 |
      | 2023-07-01 |
    When I view the historical comparison
    Then I should see a timeline of changes in their product features
    And I should see trend analysis for their pricing structure
    And I should see which market segments they've entered or exited
    