import { useHistory } from 'react-router-dom';
import './cppe-score.scss';
import { PracticeEntry } from './utils';



const CPPEPracticeLink = ({ practice }: { practice: PracticeEntry }) => {
  const history = useHistory();

  const handleNavigation = () =>{
    const targetPath = `/00/ConservationPractices/${practice.practiceCategoryId}/${practice.practiceId}`;
    history.push(targetPath);
  }

  return (
    <div>
      <div onClick = {handleNavigation}>
        <text className = 'right-pane-header'> {practice.title}</text>
      </div>
    </div>
  );
};

export default CPPEPracticeLink;
