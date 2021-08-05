import { useHistory } from 'react-router-dom';
import CustomButton from '../CustomButton';
import { ExploreBoxData } from '../../common/typedconstants.common'
import './explore-box.scss';

interface IExploreBoxData {
    id: number,
    boxHeading: string,
    boxDescription: string,
    boxButton: string,
}

const ExploreBox = () => {
    const history: any = useHistory();
    const handleExploreSearch = () => {
    history.push('search');
    };
    return(
        ExploreBoxData.map((item:IExploreBoxData) => (
            <div key={item.id} className="full-grid">
                <div className="box">
                    <h4>{item.boxHeading}</h4>
                    <CustomButton className="button" onClick={handleExploreSearch}>{item.boxButton}</CustomButton>
                    <p>{item.boxDescription}</p>
                </div>
            </div>   
            )
        )
    );
};

export default ExploreBox;
