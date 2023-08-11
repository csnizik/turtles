import { Link } from 'react-router-dom';
import './cppe-score.scss';
import { ICPPEPractice } from '../../common/types';

const CPPECautionEntry = ({ practice }: { practice: ICPPEPractice }) => {
  return (
    <li>
      <Link
        to={{
          pathname: `00/ConservationPractices/${practice.resourceConcernId}/${practice.practiceCode}`,
        }}
        target='_blank'
      >
        <text>{practice.resourceConcernName}</text>
      </Link>
    </li>
  );
};

export default CPPECautionEntry;
