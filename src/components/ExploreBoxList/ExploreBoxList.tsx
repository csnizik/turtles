import CustomButton from '../CustomButton';
import ExploreBox from '../ExploreBox';
import { exploreBoxData } from '../../common/typedconstants.common';
import './explore-box-list.scss';

interface IExploreBoxData {
  id: number;
  boxHeading: string;
  boxDescription: string;
  boxButton: string;
}

const ExploreBoxList = () => {
  return exploreBoxData.map((item: IExploreBoxData) => (
    <div key={item.id} className='full-grid'>
      <ExploreBox
        heading={item.boxHeading}
        description={item.boxDescription}
        button={item.boxButton}
      />
    </div>
  ));
};

export default ExploreBoxList;
