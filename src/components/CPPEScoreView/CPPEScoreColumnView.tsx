import { Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import './cppe-score.scss'
import { CPPESCoreEntry } from './CPPEScoreColumnEntry';
import { useGetCPPEScoresQuery } from '../../Redux/services/api';
import { IIndividualResourceConcern } from '../../common/types';
import Spinner from '../Spinner/Spinner';
import { PracticeEntry, getCheckedEntriesKey } from './utils';

// CSV download
export const download = (filename: string, text: string) => {
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);

    return element;
}

const csvFields = ['Conservation Practice', 'Code', 'CPPE', 'Effect', 'Rationale'] as const;

const csvFieldNameToProperty = {
    CPPE: 'id',
    Code: 'Id2',
    'Conservation Practice': 'title',
    Rationale: 'shortDescription',
} as const;

const  CPPESCoreView = ({ resourceConcern, stateCode }: { resourceConcern: IIndividualResourceConcern, stateCode: string }) => {

    // Declaration and initilazations of const and properties
    const intialpractice = [
        {
            id: -1,
            Id2: 100,
            title: 'Alley Cropping (311)',
            shortDescription: 'Alley cropping is an agroforestry practice where agricultural or horticultural crops are grown in the alleyways between widely spaced rows of woody plants. By combining annual and perennial crops that yield varied products and profits at different times, a landowner can more effectively use available space, time, and resources.',
        },
    ]
    const [flag, setFlag] = useState(false);
    const [activeClassName, setactiveClassName] = useState<Number>();
    const [activeCheckClass, setactiveCheckClass] = useState<Number[]>([]);
    const [sortBySelect, setsortBySelect] = useState<string>('');
    const [selected, setSelected] = useState<Number>(0);
    const [data, setData] = useState<Array<PracticeEntry>>([]);
    const [practice, setPractice] = useState<Array<PracticeEntry>>([]);
    const [checkedEntries, setCheckedEntries] = useState<{ [id: number]: boolean }>({});
    const numSelectedEntries = useMemo(() => Object.values(checkedEntries).reduce((acc, curr) => acc + (curr ? 1 : 0), 0), [checkedEntries])
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const property = 'title';
    const index = 'id';
    let hidKey: number = 0;
    const categoryChart = {
        5: 'Substantial Improvement',
        4: 'Moderate to Substantial Improvement',
        3: 'Moderate Improvement',
        2: 'Slight to Moderate Improvement',
        1: 'Slight Improvement',
        '-1': 'Slight Worsening',
        '-2': 'Slight to Moderate Worsening',
        '-3': 'Moderate Worsening',
        '-4': 'Moderate to Substantial Worsening',
        '-5': 'Moderate to Substantial Worsening',
    };

    // Event handlers and functions 
    // Left panel Row Click event handler 
    const handleRowClick = (id) => {
        setFlag(true);
        setactiveClassName(id);
        setSelected(id);
        const ID2 = 'Id2'
        const value = data[id][ID2];
        setPractice(id);
        let practice2 = data.filter(x => x.Id2 === value)
        setPractice(practice2);
        setData(data);
    }

    //Check click event handler 
    const handleCheckClick = (id) => {
        const index = activeCheckClass.indexOf(id);
        if (index > -1) {
            setactiveCheckClass([
                ...activeCheckClass.slice(0, index),
                ...activeCheckClass.slice(index + 1)
            ]);
        } else setactiveCheckClass([...activeCheckClass, id]);
    }

    // Sort By Event handler 
    const handleSelectChange = (value) => {
        if (value === 'score') {
            data.sort((a: any, b: any): any => {
                return b.id - a.id;
            });
            setData(data);
        }
        else if (value === 'practiceName') {
            data.sort((a: any, b: any): any => {
                if (a.title < b.title) {
                    return -1;
                }
                if (a.title > b.title) {
                    return 1;
                }
                return 0;
            });
            setData(data);
        }
        setsortBySelect(value)
        setactiveClassName(-1)
        const arr = []
        setactiveCheckClass(arr)
    }

    const { data: getCppeScoresData, error, isLoading, isSuccess, isError } = useGetCPPEScoresQuery({ resourceId: resourceConcern.resourceConcernId, stateCode })

    // use effect 
    useEffect(() => {
        if (getCppeScoresData !== undefined) {
            // Call API from here 
            const fetchData: PracticeEntry[] = getCppeScoresData.map(practice => ({
                id: practice.cppeEffectValue,
                Id2: practice.practiceId,
                title: practice.practiceName,
                shortDescription: practice.practiceDescription,
                practiceCategory: practice.practiceCategory,
            }));
            fetchData.sort((a: any, b: any): any => {
                return b.id - a.id;
            });
            setData(fetchData);
            const checkedEntries = {};
            fetchData.forEach(d => {
                checkedEntries[getCheckedEntriesKey(d)] = false;
            });
            setCheckedEntries(checkedEntries);
        }
    }, [getCppeScoresData]);

    //ensures that whenever the checkedEntries object changes, 
    //the state of the "Select all" checkbox is updated based on whether all checkboxes are checked or not.
    useEffect(() => {
        setSelectAllChecked(!Object.values(checkedEntries).some(isChecked => !isChecked));
    }, [checkedEntries])

    // Function given the array and index return value of the property 
    function GetElement({ array, index, property }) {
        if (index < 0 || index >= array.lenght) {
            return <div> Invalid index</div>
        }
        const value = array[index][property];
        if (value === undefined) {
            return <div> Invalid property: {property} </div>
            //The value of property {property} at index {index} is:
        }
        return <div> {value} </div>;
    }

    // Function return the CPPEScore for a given index 
    function getCPPScore(array, index, property) {
        if (index < 0 || index >= array.lenght) {
            return <div> Invalid index</div>
        }
        const value = array[index][property];
        if (value === undefined) {
            return null;
        }
        return parseInt(value, 10);
    }

    // Renders the CPPE description 
    const renderDescription = (number) => {
        if (number in categoryChart) {
            return <div key={number} className="desc" style={{ paddingLeft: '20px' }}> {categoryChart[number]}</div>
        }
        return <div style={{ paddingLeft: '20px' }} >  No Comment</div>
    }

    function id(value: { id: number; title: String; shortDescription: String; Id2: number; }, index: number, array: { id: number; title: String; shortDescription: String; Id2: number; }[]): value is { id: number; title: String; shortDescription: String; Id2: number; } {
        throw new Error('Function not implemented.');
    }

    function handleExport() {
        const exportedPractices = data.filter(practice => checkedEntries[getCheckedEntriesKey(practice)]);
        const numExportedPractices = exportedPractices.length;
        const filename = `${resourceConcern.resourceConcernName.replaceAll(' ', '_')}_CPPE_export_${numExportedPractices}_practices.csv`;
        const csvHeader = `${csvFields.join(',')}\n`;
        const csvBody = exportedPractices.reduce((acc, curr) => `${acc}${csvFields.map(field => {
            if (field === 'Effect') {
                return categoryChart[curr.id] ?? 'No Comment';
            }
            return `"${curr[csvFieldNameToProperty[field]]}"`;
        }).join(',')}\n`, '');
        download(filename, `${csvHeader}${csvBody}`);
    }

    return (
        <>
            <div className='Alert-container-box'>
                <div className='container'>
                    <p className='title'>Conservation Practice(s)</p>
                    <div className='dropdown'>
                        <label className='check'>
                            <input type="checkbox"
                                data-testid="selectAll"
                                className='selectAll'
                                checked={selectAllChecked}
                                onChange={() => {
                                    setSelectAllChecked((prevSelectAllChecked) => {
                                        setCheckedEntries((prevCheckedEntries) => {
                                            const result = {};
                                            for (const k of Object.keys(prevCheckedEntries)) {
                                                result[k] = !prevSelectAllChecked;
                                            }
                                            return result;
                                        });
                                        return !prevSelectAllChecked;
                                    });
                                }}
                            />
                            Select all
                        </label>
                        <label className='dropdown-items'>Sort By:
                            <select onChange={(e) => handleSelectChange(e.target.value)}>
                                <option value='score'>CPPE (high to low)</option>
                                <option value='practiceName'>Practice Name</option>
                            </select>
                        </label>
                    </div>
                    <div className='child-container'>
                        <div className="conservation-practice-wrapper">
                            {!isLoading && isSuccess && data.length > 0 && Object.keys(checkedEntries).length > 0 ? (
                                <div className="conservation-practices">
                                    {data.map((item) => (
                                        <CPPESCoreEntry key={hidKey} handleRowClick={handleRowClick} item={item}
                                            hiddenKey={hidKey++} activeClassName={activeClassName} checked={checkedEntries[getCheckedEntriesKey(item)]}
                                            handleChange={(item: PracticeEntry) => () => setCheckedEntries((prevCheckedEntries) => ({ ...prevCheckedEntries, [getCheckedEntriesKey(item)]: !prevCheckedEntries[getCheckedEntriesKey(item)] }))} />

                                    ))}
                                </div>
                            ) : (
                                <Spinner />
                            )}
                            {isError && error}
                            <div className="details">
                                {(flag === false) ? (<h1>...</h1>) : (
                                    <div className='practice-item'>
                                        <h2><GetElement array={practice} index={0} property={property} /></h2>
                                        <div className='flexdata' >
                                            {(() => {
                                                let item = getCPPScore(practice, 0, index);

                                                const numericValue = Number(item);

                                                let text = `+${item}`;
                                                if (numericValue > 0) return <div className='green-box'>{text} </div>
                                                else if (numericValue < 0) return <div className='red-box'>{item}</div>
                                                else return <p className='grey-box'>{item}</p>
                                            })()}

                                            {(() => {
                                                let item = getCPPScore(practice, 0, index);
                                                return renderDescription(item)
                                            })()}
                                        </div>
                                        <h3> Practice Information</h3>
                                        <img className='practice-item' alt='' src="../../../images/landscape-initiatives-images/default.jpg" />
                                        <p><GetElement array={practice} index={0} property={'shortDescription'} /></p>
                                        <div className="caution-container">
                                            <img src={'../../../../images/ic_error_24px.svg'} alt="Warning" />
                                            <h2> Caution for application</h2>
                                            <p> This practice has a negative effect on the following resource concerns: </p>
                                            <ul>
                                                <li><Link to={{ pathname: 'https://www.nrcs.usda.gov/Internet/NRCS_RCA/reports/data_viewer_home.html', }} target='_blank' > <text> Placeholder Resource Concern 1</text> </Link></li>
                                                <li><Link to={{ pathname: 'https://www.nrcs.usda.gov/Internet/NRCS_RCA/reports/data_viewer_home.html', }} target='_blank' > Placeholder Resource Concern 2 </Link></li>
                                                <li><Link to={{ pathname: 'https://www.nrcs.usda.gov/Internet/NRCS_RCA/reports/data_viewer_home.html', }} target='_blank' > Placeholder Resource Concern 3 </Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='export-container container'>
                    <button
                        type='button'
                        className='usa-button'
                        onClick={handleExport}
                    >
                        Export {numSelectedEntries} Select Practice(s)
                    </button>
                </div>
            </div>
        </>
    )
}

export default CPPESCoreView;