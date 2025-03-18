# Sneaky Competitive Intelligence Domain Model

## Core Domain Entities

### Strategic Entities

- **Company**: Represents both the entrepreneur's company and competitors
- **Product**: Core offerings with features, pricing, and market positioning
- **MarketMap**: 2x2 matrices showing relative positioning of products
- **CompetitiveAnalysis**: Structured comparisons between products
- **StrategicInsight**: Actionable recommendations derived from analysis

### Market Entities

- **MarketSegment**: Target customer groups
- **CustomerProfile**: Detailed buyer personas
- **IndustryTrend**: Market movements affecting the competitive landscape
- **GeographicRegion**: Regional market presence and localization status

### Product Attributes

- **Feature**: Capabilities offered by products
- **PricingStructure/PricingTier**: Monetization approaches
- **TechComponent**: Technical stack and integrations
- **UXComparison**: User experience and design patterns
- **DistributionChannel**: How products reach customers
- **ContentStrategy**: Thought leadership and marketing content
- **EngagementMetrics**: User interaction and retention metrics
- **RegulatoryFactor**: Compliance requirements affecting products

### Operational Entities

- **SalesModel**: Self-serve vs. sales-led approaches
- **CustomerSuccessApproach**: Onboarding and support structures
- **MarketingCampaign**: Promotion strategies and messaging
- **HistoricalChange**: Timeline of competitor modifications
- **Review/SentimentAnalysis**: Customer feedback and perception
- **Alert**: Notification system for competitive changes
- **DataSource**: Intelligence origins with reliability tracking

## Key Domain Relationships

1. **Product Intelligence Chain**:

   - Companies offer Products
   - Products contain Features
   - Features are tracked through HistoricalChange
   - Products are positioned on MarketMaps

2. **Market Intelligence Chain**:

   - Products target MarketSegments
   - Products have geographic presence in Regions
   - Products are distributed through Channels
   - Products are affected by IndustryTrends

3. **Analysis Intelligence Chain**:

   - Products are analyzed in CompetitiveAnalysis
   - Analysis generates StrategicInsights
   - Insights may trigger Alerts
   - Intelligence is collected from DataSources

4. **Operational Intelligence Chain**:
   - Products are sold via SalesModels
   - Products are supported by CustomerSuccessApproaches
   - Products are measured by EngagementMetrics
   - Products are marketed with ContentStrategies

## Domain-Specific Rules & Invariants

1. Every Product must have at least one MarketSegment it targets
2. PricingTiers must link to specific Features they include
3. CompetitiveAnalysis must include at least two Products for comparison
4. StrategicInsights must be backed by supporting data from CompetitiveAnalysis
5. Historical changes must be tracked with timestamps for trend analysis
6. Alert categories determine notification priority and routing
7. Data source reliability affects confidence scores of associated insights

## Ubiquitous Language Glossary

- **Competitive Intelligence**: Systematic gathering and analysis of information about competitors
- **Market Positioning**: How a product is perceived relative to competitors
- **Feature Gap**: Capability differences between competing products
- **Sentiment Analysis**: Measuring customer perception from reviews and social media
- **Growth Metrics**: Quantitative measures of company performance and trajectory
- **Strategic Insight**: Actionable recommendation derived from competitive analysis
- **Benchmark Score**: Numerical comparison against competitors on specific dimensions
