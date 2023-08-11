import { PracticeEntry } from "./utils";

export const CPPEScoreEntry = (props: { hiddenKey: number; activeClassName: any; item: any; handleRowClick: (hiddenKey: number) => void; checked: boolean; handleChange: (id: PracticeEntry) => () => void }) => {
    
    const {hiddenKey, activeClassName, item, handleRowClick, handleChange, checked } = props;

    let className = hiddenKey === activeClassName  ? 'clicked-row' : 'row-click';
    className += checked ? ' click-check' : ' unclicked';


    return(
        <div className={className}
            data-testid="RowClick" onClick={() => handleRowClick(hiddenKey)}>
            <div className='flexdata'>
                {(() => {
                    let text = `+${item.id}`;
                    if (item.id > 0) return <p className='green-box'>{text}</p>
                    else if (item.id < 0) return <p className='red-box'>{item.id}</p>
                    else return <p className='grey-box'>{item.id}</p>
                })()}
                <p className='practice-name'>{item.title}</p>
                <input type='checkbox' className='checkbox' onChange={handleChange(item)} checked={checked} />
            </div>
            <p className='practice-description'>{item.rationale}</p>
            <hr />
        </div>
    )
}