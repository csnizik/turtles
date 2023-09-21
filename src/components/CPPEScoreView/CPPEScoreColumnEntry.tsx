import { PracticeEntry } from "./utils";

export const CPPEScoreEntry = (props: { hiddenKey: number; activeClassName: any; item: any; handleRowClick: (hiddenKey: number, selectedPractice: PracticeEntry) => void; checked: boolean; handleChange: (id: PracticeEntry) => () => void }) => {
    
    const {hiddenKey, activeClassName, item, handleRowClick, handleChange, checked } = props;

    let className = hiddenKey === activeClassName  ? 'clicked-row' : 'row-click';
    className += checked ? ' click-check' : ' unclicked';


    return(
        <div className={className}
            data-testid="RowClick" onClick={() => handleRowClick(hiddenKey, item)}>
            <div className='flexdata'>
                {(() => {
                    let text = `+${item.cppeScore}`;
                    if (item.cppeScore > 0) return <p className='green-box'>{text}</p>
                    else if (item.cppeScore < 0) return <p className='red-box'>{item.cppeScore}</p>
                    else return <p className='white-box'>{item.cppeScore}</p>
                })()}
                <p className='practice-name'>{item.title}</p>
                <input type='checkbox' className='checkbox' onChange={handleChange(item)} checked={checked} />
            </div>
            <p className='practice-description'>{item.rationale}</p>
            <hr />
        </div>
    )
}