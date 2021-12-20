import TableauReport from './TableauReport';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

describe('Tableau is rendered correctly', () => {

    beforeEach(() => {
        render(
          <TableauReport pageName='Conservation Practice'/>
        );
    });

    test('Should display Tableau link on Conservation Practice Page', () => {
        expect(screen.getByAltText('Regional Conservation Practice')).toHaveAttribute(
          'src',
          'https://publicdashboards-dev.dl.usda.gov/t/FPAC_PUB/views/CPDPracticeListbyAcres/Dashboard1.png?Stabbr='
        );
      });
});

describe('Practice Detail Tableau Link is rendered correctly', () => {

    beforeEach(() => {
        render(
          <TableauReport pageName='Practice Detail'/>
        );
    });

    test('Should display Individual Practice Tableau link on Individual Practice Page', () => {
        expect(screen.getByAltText('Practice Detail')).toHaveAttribute(
          'src',
          'https://publicdashboards-dev.dl.usda.gov/t/FPAC_PUB/views/CPDPracticebyProgramOverYears/Dashboard1.png?Stabbr=&Practice Code=100'
        );
      });
});

describe('Conservation Practice Category is rendered correctly', () => {

    beforeEach(() => {
        render(
          <TableauReport pageName='Cropland Soil Quality'/>
        );
    });

    test('Should display Cropland Soild Quality Tableau link on Conservation Practice Category Page', () => {
        expect(screen.getByAltText('Conservation Practice Category')).toHaveAttribute(
          'src',
          'https://publicdashboards-dev.dl.usda.gov/t/FPAC_PUB/views/CPDPracticesbyYearforStateandMeasure/Dashboard1.png?Stabbr=&Measure=Cropland Soil Quality'
        );
      });
});