import TopPracticesEQUIPOpenData from '../TableauReport/TopPracticesEQUIPOpenData';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';
import ConservationPracticeCategory from './ConservationPracticeCategory';
import RegionalConservationPractice from './RegionalConservationPractice';
import PracticeDetailReport from './PracticeDetailReport';
import EquipPracticeCertificationTrend from './EquipPracticeCertificationTrend';

afterEach(() => {
  cleanup();
});

let setIsTableauEmpty = () => {};

describe('Top Practice Equip Tableau is rendered correctly', () => {
  beforeEach(() => {
    render(<TopPracticesEQUIPOpenData setIsTableauEmpty={setIsTableauEmpty} />);
  });

  test('Should display the Top Practice Equip Data Tableau Report Container', () => {
    expect(screen.getByTestId('tableau-report-container')).toBeDefined();
  });
});

describe('Conservation Practice Category Equip Tableau is rendered correctly', () => {
  beforeEach(() => {
    render(
      <ConservationPracticeCategory
        pageName='Cropland Soil Quality'
        setIsTableauEmpty={setIsTableauEmpty}
      />
    );
  });

  test('Should display the Conservation Practice Category Equip Data Tableau Report Container', () => {
    expect(screen.getByTestId('tableau-report-container')).toBeDefined();
  });
});

describe('Regional Conservation Practice Equip Tableau is rendered correctly', () => {
  beforeEach(() => {
    render(
      <RegionalConservationPractice setIsTableauEmpty={setIsTableauEmpty} />
    );
  });

  test('Should display the Conservation Practice Category Equip Data Tableau Report Container', () => {
    expect(screen.getByTestId('tableau-report-container')).toBeDefined();
  });
});

describe('Practice Detail Report Equip Tableau is rendered correctly', () => {
  beforeEach(() => {
    render(
      <PracticeDetailReport
        practiceCode='00'
        checkTableauIsEmpty={setIsTableauEmpty}
      />
    );
  });

  test('Should display the Practice Detail Report Equip Tableau Container', () => {
    expect(screen.getByTestId('tableau-report-container')).toBeDefined();
  });
});

describe('Practice Certification Equip Tableau is rendered correctly', () => {
  beforeEach(() => {
    render(
      <EquipPracticeCertificationTrend
        practiceCode='00'
        checkTableauIsEmpty={setIsTableauEmpty}
      />
    );
  });

  test('Should display the Practice Certification Equip Data Tableau Report Container', () => {
    expect(screen.getByTestId('tableau-report-container')).toBeDefined();
  });
});
