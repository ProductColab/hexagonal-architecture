# Sneaky Competitive Intelligence Domain Model

```mermaid
classDiagram
    %% New Concepts

    class CompetitiveEvent {
        +String name
        +Date occurred
        +EventType type
        +String description
        +double marketImpactScore
        +List~Company~ involvedCompanies
        +List~Product~ affectedProducts
        +analyzeImpact()
        +categorizeSignificance()
    }

    class EventType {
        <<enumeration>>
        ACQUISITION
        MERGER
        PRODUCT_LAUNCH
        LEADERSHIP_CHANGE
        PARTNERSHIP_ANNOUNCEMENT
        FUNDING_EVENT
        MARKET_EXIT
        REGULATORY_EVENT
    }

    class IntelligenceSource {
        +String name
        +SourceType type
        +double credibilityScore
        +double accessLevel
        +Date lastContact
        +List~String~ specialtyAreas
        +String relationshipNotes
        +validateInformation(String information)
        +calculateReliability()
    }

    class SourceType {
        <<enumeration>>
        INDUSTRY_EXPERT
        FORMER_EMPLOYEE
        CHANNEL_PARTNER
        CUSTOMER
        PUBLIC_EVENT
        SOCIAL_MEDIA
        ANALYST_REPORT
        SALES_TEAM_FEEDBACK
    }

    class Benchmark {
        +String name
        +String category
        +String measurementUnit
        +double industryAverage
        +Map~Product, Double~ scores
        +normalizeScores()
        +identifyOutliers()
    }

    class CompetitiveAdvantage {
        +String name
        +String description
        +AdvantageType type
        +double sustainabilityScore
        +Date identified
        +List~Feature~ contributingFeatures
        +assessSustainability()
        +compareWithCompetitors(List~Company~ competitors)
    }

    class AdvantageType {
        <<enumeration>>
        COST_LEADERSHIP
        DIFFERENTIATION
        FOCUS_STRATEGY
        TECHNOLOGY
        NETWORK_EFFECT
        SWITCHING_COST
        BRAND_EQUITY
        REGULATORY_ADVANTAGE
    }

    class MarketObstacle {
        +String name
        +String description
        +ObstacleType type
        +double impactScore
        +List~Strategy~ mitigationStrategies
        +List~MarketSegment~ affectedSegments
        +assessImpact()
        +developMitigation()
    }

    class ObstacleType {
        <<enumeration>>
        BARRIER_TO_ENTRY
        SWITCHING_COST
        REGULATORY_CONSTRAINT
        TECHNOLOGY_GAP
        MARKET_SATURATION
        CUSTOMER_INERTIA
        RESOURCE_CONSTRAINT
        ECOSYSTEM_LOCK_IN
    }

    class Strategy {
        +String name
        +String description
        +List~String~ tactics
        +double expectedEffectiveness
        +Date implementationDate
        +monitorEffectiveness()
    }

    class PartnershipNetwork {
        +Company primaryCompany
        +List~Partnership~ partnerships
        +double networkStrength
        +List~String~ strategicGoals
        +identifyKeyPartners()
        +assessNetworkValue()
    }

    class Partnership {
        +Company partner
        +PartnershipType type
        +Date established
        +List~String~ sharedResources
        +double strategicImportance
        +assessHealthScore()
    }

    class PartnershipType {
        <<enumeration>>
        TECHNOLOGY_INTEGRATION
        RESELLER
        CO_MARKETING
        JOINT_VENTURE
        SUPPLY_CHAIN
        INNOVATION_PARTNERSHIP
        DISTRIBUTION
        STRATEGIC_ALLIANCE
    }

    class TalentIntelligence {
        +Company company
        +Map~String, Integer~ departmentSizes
        +List~KeyPersonnel~ keyPeople
        +double attritionRate
        +List~String~ recruitmentFocus
        +Date lastUpdated
        +identifyTalentGaps()
        +trackLeadershipChanges()
    }

    class KeyPersonnel {
        +String name
        +String role
        +List~String~ expertise
        +String background
        +Date joinedCompany
        +List~String~ priorCompanies
        +double influenceScore
        +trackMovements()
    }

    class AdoptionLifecycle {
        +Product product
        +AdoptionStage currentStage
        +double adoptionRate
        +double marketPenetration
        +Date stageEntryDate
        +Map~MarketSegment, AdoptionStage~ segmentAdoption
        +predictNextStage()
        +compareWithCompetitors()
    }

    class AdoptionStage {
        <<enumeration>>
        INNOVATORS
        EARLY_ADOPTERS
        EARLY_MAJORITY
        LATE_MAJORITY
        LAGGARDS
        END_OF_LIFE
    }

    class CompetitiveResponsePattern {
        +Company company
        +String patternName
        +String description
        +ResponseType typicalResponse
        +double responseTimeAvg
        +List~CompetitiveEvent~ pastResponses
        +double predictabilityScore
        +predictResponse(CompetitiveEvent event)
        +analyzeEffectiveness()
    }

    class ResponseType {
        <<enumeration>>
        PRICE_ADJUSTMENT
        FEATURE_MATCHING
        MARKETING_CAMPAIGN
        PARTNERSHIP
        ACQUISITION
        IGNORE
        LEGAL_ACTION
        PRODUCT_PIVOT
    }

    class IntelligenceGap {
        +String topic
        +String description
        +double businessImpact
        +GapPriority priority
        +List~IntelligenceSource~ potentialSources
        +Date identified
        +createResearchPlan()
        +trackProgress()
    }

    class GapPriority {
        <<enumeration>>
        CRITICAL
        HIGH
        MEDIUM
        LOW
        FUTURE_CONCERN
    }

    %% Relationships

    Company "1" *-- "*" CompetitiveEvent: participates in
    CompetitiveEvent "*" o-- "*" Product: affects
    IntelligenceSource "*" -- "*" IntelligenceGap: addresses
    Company "*" -- "*" IntelligenceSource: information from
    CompetitiveAnalysis "1" *-- "*" Benchmark: uses
    Benchmark "*" -- "*" Product: evaluates
    Company "1" *-- "*" CompetitiveAdvantage: possesses
    CompetitiveAdvantage "*" -- "*" Feature: enabled by
    Product "*" -- "*" MarketObstacle: faces
    MarketObstacle "1" *-- "*" Strategy: overcome by
    Company "1" *-- "1" PartnershipNetwork: maintains
    PartnershipNetwork "1" *-- "*" Partnership: consists of
    Partnership "*" -- "*" Company: connects
    Company "1" *-- "1" TalentIntelligence: analyzed by
    TalentIntelligence "1" *-- "*" KeyPersonnel: tracks
    Product "1" *-- "1" AdoptionLifecycle: exists in
    AdoptionLifecycle "*" -- "*" MarketSegment: varies by
    Company "1" *-- "*" CompetitiveResponsePattern: exhibits
    CompetitiveResponsePattern "*" -- "*" CompetitiveEvent: triggered by
    Company "1" *-- "*" IntelligenceGap: identifies
    IntelligenceGap "*" -- "*" CompetitiveAnalysis: informs
    HistoricalChange "*" -- "*" CompetitiveEvent: documents
    StrategicInsight "*" -- "*" CompetitiveAdvantage: leverages
    Alert "*" -- "1" CompetitiveEvent: may signal
    IndustryTrend "*" -- "*" CompetitiveEvent: influenced by
    StrategicInsight "*" -- "*" IntelligenceGap: addresses
```
