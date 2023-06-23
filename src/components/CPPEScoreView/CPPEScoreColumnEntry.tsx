export const CPPESCoreEntry = (props) => {
    
    const {hiddenKey, activeClassName, item, handleRowClick, activeCheckClass, handleCheckClick} = props;
    
    let className = hiddenKey === activeClassName  ? 'clicked-row' : 'row-click';
    className += activeCheckClass.indexOf(hiddenKey) !== -1 ? ' click-check' : ' unclicked';
    return(
        <div className={className}
                                        onClick={() => handleRowClick(hiddenKey)}>
                                        <div className='flexdata'>
                                            {(() => {
                                                let text = `+${item.id}`;
                                                if (item.id > 0) return <p className='green-box'>{text}</p>
                                                else if (item.id < 0) return <p className='red-box'>{item.id}</p>
                                                else return <p className='grey-box'>{item.id}</p>
                                            })()}
                                            <p className='practice-name'>{item.title}</p>
                                            <input type='checkbox' checked={activeCheckClass.indexOf(hiddenKey) !== -1} onClick={() => handleCheckClick(hiddenKey)} className='checkbox' />
                                        </div>

                                        <p className='practice-description'>{item.shortDescription}</p>
                                        <hr />
                                    </div>
    )
}