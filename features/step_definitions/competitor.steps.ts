import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from 'chai';
import { CompetitorProfile, CompanySize } from '../../src/domain/competitor/CompetitorProfile';
import { MarketPositioning } from '../../src/domain/competitor/MarketPosition';
import { CreateCompetitorDto } from '../../src/domain/competitor/dto/CreateCompetitorDto';
import { UpdateMarketPositionDto } from '../../src/domain/competitor/dto/UpdateMarketPositionDto';
import { CustomWorld } from '../support/world';

// Scenario: Creating a new competitor profile
Given('I have competitor details', async function (this: CustomWorld, dataTable: DataTable) {
  const details = dataTable.hashes()[0];
  const createDto: CreateCompetitorDto = {
    name: details.name,
    industry: details.industry,
    size: details.size as CompanySize,
    founded: new Date(details.founded),
    description: details.description,
    initialMarketShare: parseFloat(details.marketShare),
    positioning: details.positioning as MarketPositioning,
    competitiveAdvantages: details.advantages ? details.advantages.split(',').map(a => a.trim()) : []
  };

  try {
    this.currentCompetitorId = await this.getService().createCompetitor(createDto);
    // Immediately fetch the created competitor
    const competitor = await this.getService().getCompetitorDetails(this.currentCompetitorId);
    if (!competitor) {
      throw new Error('Failed to retrieve created competitor');
    }
    this.currentCompetitor = competitor;
  } catch (error) {
    this.error = error as Error;
  }
});

When('I create a new competitor profile', async function (this: CustomWorld) {
  expect(this.error).to.be.undefined;
  expect(this.currentCompetitorId).to.not.be.undefined;
  expect(this.currentCompetitor).to.not.be.undefined;
});

Then('the competitor should be added to the system', async function (this: CustomWorld) {
  expect(this.currentCompetitorId).to.not.be.undefined;
  const exists = await this.getService().getCompetitorDetails(this.currentCompetitorId!);
  expect(exists).to.not.be.null;
});

Then('I should be able to retrieve the competitor details', async function (this: CustomWorld) {
  const competitor = await this.getService().getCompetitorDetails(this.currentCompetitorId!);
  expect(competitor).to.not.be.null;
  if (!competitor) {
    throw new Error('Failed to retrieve competitor');
  }
  this.currentCompetitor = competitor;
});

// Scenario: Updating competitor market position
Given('a competitor {string} exists in the system', async function (this: CustomWorld, competitorName: string) {
  const competitor = await this.getService().findCompetitorByName(competitorName);
  expect(competitor).to.not.be.null;
  this.currentCompetitor = competitor!;
  this.currentCompetitorId = competitor!.getId();
});

When('I update their market position', async function (this: CustomWorld, dataTable: DataTable) {
  expect(this.currentCompetitorId).to.not.be.undefined;
  expect(this.currentCompetitor).to.not.be.undefined;

  const details = dataTable.hashes()[0];
  const updateDto: UpdateMarketPositionDto = {
    marketShare: parseFloat(details.marketShare),
    positioning: details.positioning as MarketPositioning,
    competitiveAdvantages: details.advantages ? details.advantages.split(',').map(a => a.trim()) : []
  };

  try {
    await this.getService().updateMarketPosition(this.currentCompetitorId!, updateDto);
    // Refresh the competitor after update
    const competitor = await this.getService().getCompetitorDetails(this.currentCompetitorId!);
    if (!competitor) {
      throw new Error('Failed to retrieve updated competitor');
    }
    this.currentCompetitor = competitor;
  } catch (error) {
    this.error = error as Error;
  }
});

Then('the competitor\'s market position should be updated', async function (this: CustomWorld) {
  expect(this.currentCompetitor).to.not.be.undefined;
  expect(this.currentCompetitor!.getMarketPosition()).to.not.be.undefined;
});

Then('the last updated date should be current', function (this: CustomWorld) {
  expect(this.currentCompetitor).to.not.be.undefined;
  const lastUpdated = this.currentCompetitor!.getMarketPosition().getLastUpdated();
  console.log('Last Updated:', lastUpdated.toDate());
  console.log('Current Time:', new Date());
  console.log('Unix Timestamp:', lastUpdated.toUnixTimestamp());
  expect(lastUpdated.isWithinSeconds(60)).to.be.true;
});

// Scenario: Adding competitive advantages
When('I add the following competitive advantages', async function (this: CustomWorld, dataTable: DataTable) {
  expect(this.currentCompetitor).to.not.be.undefined;
  const currentPosition = this.currentCompetitor!.getMarketPosition();

  const updateDto: UpdateMarketPositionDto = {
    marketShare: currentPosition.getMarketShare().toPercentage(),
    positioning: currentPosition.getPositioning(),
    competitiveAdvantages: dataTable.hashes().map(row => row.advantage)
  };

  try {
    await this.getService().updateMarketPosition(this.currentCompetitorId!, updateDto);
    // Refresh the competitor after update
    const competitor = await this.getService().getCompetitorDetails(this.currentCompetitorId!);
    if (!competitor) {
      throw new Error('Failed to retrieve updated competitor');
    }
    this.currentCompetitor = competitor;
  } catch (error) {
    this.error = error as Error;
  }
});

Then('these advantages should be reflected in their profile', async function (this: CustomWorld) {
  expect(this.currentCompetitor).to.not.be.undefined;
  const advantages = this.currentCompetitor!.getMarketPosition().getCompetitiveAdvantages();
  expect(advantages).to.not.be.empty;
}); 