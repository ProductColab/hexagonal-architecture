Feature: Competitor Management
  As a competitive intelligence analyst
  I want to manage competitor profiles
  So that I can track and analyze market competition

  Scenario: Creating a new competitor profile
    Given I have competitor details
      | name     | industry   | size  | founded    | description        | marketShare | positioning | advantages           |
      | TechCorp | Technology | LARGE | 2010-01-01 | Leading tech firm  | 15.5        | CHALLENGER  | Innovation,Research |
    When I create a new competitor profile
    Then the competitor should be added to the system
    And I should be able to retrieve the competitor details

  Scenario: Updating competitor market position
    Given I have competitor details
      | name     | industry   | size  | founded    | description        | marketShare | positioning | advantages           |
      | TechCorp | Technology | LARGE | 2010-01-01 | Leading tech firm  | 15.5        | CHALLENGER  | Innovation,Research |
    And I create a new competitor profile
    When I update their market position
      | marketShare | positioning | advantages                    |
      | 20.5       | LEADER      | Innovation,Brand,Market Share |
    Then the competitor's market position should be updated
    And the last updated date should be current

  Scenario: Adding competitive advantages
    Given I have competitor details
      | name     | industry   | size  | founded    | description        | marketShare | positioning | advantages           |
      | TechCorp | Technology | LARGE | 2010-01-01 | Leading tech firm  | 15.5        | CHALLENGER  | Innovation,Research |
    And I create a new competitor profile
    When I add the following competitive advantages
      | advantage                |
      | Strong R&D Department    |
      | Global Market Presence   |
      | Advanced AI Capabilities |
    Then these advantages should be reflected in their profile 