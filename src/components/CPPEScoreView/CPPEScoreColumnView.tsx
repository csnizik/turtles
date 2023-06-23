import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import './cppe-score.scss'
import { CPPESCoreEntry } from './CPPEScoreColumnEntry';


const CPPESCoreView = () => {

const getData = () => {
        //simulating an api or data retrieval
        const fetchData = [
            {
                id: -1,
                Id2: 100,
                title: 'Alley Cropping (311)',
                shortDescription: 'Alley cropping is an agroforestry practice where agricultural or horticultural crops are grown in the alleyways between widely spaced rows of woody plants. By combining annual and perennial crops that yield varied products and profits at different times, a landowner can more effectively use available space, time, and resources.',
            },
            {
                id: 2,
                Id2: 101,
                title: 'Cover Crop (340)',
                shortDescription: 'Critical area planting establishes permanent vegetation on sites that have, or are expected to have, high erosion rates, and on sites that have conditions that prevent the establishment of vegetation with normal practices.',
            },
            {
                id: -3,
                Id2: 102,
                title: 'Critical Area Planting (342)',
                shortDescription: 'this is a short description this is a short description this is a short description this is a short description this is a short description  ',


            },
            {
                id: 0,
                Id2: 103,
                title: 'Deep Tillage (324)',
                shortDescription: 'This practice includes tillage methods commonly referred to as mulch tillage where a majority of the soil surface is disturbed by noninversion tillage operations such as vertical tillage, chiseling, and disking, and also includes tillage/planting systems with relatively minimal soil disturbance. ',


            },
            {
                id: 0,
                Id2: 104,
                title: 'Compaction',
                shortDescription: 'Management-induced soil compaction at any level throughout the soil profile resulting in reduced plant productivity, biological activity, infiltration and aeration.',


            },
            {
                id: -5,
                Id2: 105,
                title: 'Organic matter depletion',
                shortDescription: 'Management-induced depletion of any or all pools of soil organic matter resulting in limited soil function and processes that support plant productivity, biological activity and water and nutrient cycling.',


            },
            {
                id: 5,
                Id2: 106,
                title: 'Sheet and rill erosion',
                shortDescription: 'Detachment and transport of soil particles caused by rainfall, melting snow, or irrigation.this is a short description this is a short description this is a short description this is a short description this is a short description.',

            },
        ];
        return fetchData;
    };
    // Declaration and initilazations of const and properties
    const intialpractice = [
        {
            id: -1,
            Id2: 100,
            title: 'Alley Cropping (311)',
            shortDescription: 'Alley cropping is an agroforestry practice where agricultural or horticultural crops are grown in the alleyways between widely spaced rows of woody plants. By combining annual and perennial crops that yield varied products and profits at different times, a landowner can more effectively use available space, time, and resources.',
        },
    ]
    const [flag, setFlag]= useState(false);
    const [activeClassName, setactiveClassName] = useState<Number>();
    const [activeCheckClass, setactiveCheckClass] = useState<Number[]>([]);
    const [sortBySelect, setsortBySelect] = useState<string>('');
    const [selected , setSelected ] = useState<Number>(0);
    const [data, setData] = useState<Array<{ id: number, title: String, shortDescription: String, Id2: number }>>([]);
    const [practice, setPractice] = useState<Array<{ id: number, title: String, shortDescription: String, Id2: number }>>([]);
    const property = 'title';
    const index = 'id';
    let hidKey: number = 0; 
    const categoryChart = [
        { number: 5, description: 'Substantial Improvement' },
        { number: 4, description: 'Moderate to Substantial Improvement' },
        { number: 3, description: 'Moderate Improvement' },
        { number: 2, description: 'Slight to Moderate Improvement' },
        { number: 1, description: 'Slight Improvement' },
        { number: -1, description: 'Slight Worsening' },
        { number: -2, description: 'Slight to Moderate Worsening' },
        { number: -3, description: 'Moderate Worsening' },
        { number: -4, description: 'Moderate to Substantial Worsening' },
        { number: -5, description: 'Moderate to Substantial Worsening' },
      ];

    // Event handlers and functions 
    // Left panel Row Click event handler 
    const handleRowClick = (id) => {
        setFlag(true);
        //console.log('Handle Row events clicked ID = ',id); 
        setactiveClassName(id);
        setSelected(id);
        const ID2 = 'Id2'
        const value =data[id][ID2]; 
        setPractice(id);
       // console.log('Active value Id2 = ', value); 
        let practice2 = data.filter(x=>x.Id2 === value)
       //console.log('filter result = ', practice2);
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
     
    // use effect 
    useEffect(() => {
        // Call API from here 
        const fetchData = getData();
        fetchData.sort((a: any, b: any): any => {
            return b.id - a.id;
        });
        setData(fetchData);
    }, []);

    // Function given the array and index return value of the property 
    function GetElement({array, index, property})
    {   
        if(index < 0 || index >=array.lenght){
            return <div> Invalid index</div>
        }
        const value =array[index][property]; 
        if (value === undefined) {
           return <div> Invalid property: {property} </div>
           //The value of property {property} at index {index} is:
        }
        return <div> {value} </div>;
    }

    // Function return the CPPEScore for a given index 
    function getCPPScore(array, index, property)
    {   
        if(index < 0 || index >=array.lenght){
            return <div> Invalid index</div>
        }
        const value =array[index][property]; 
        if (value === undefined) {
           return null;
        }
        return parseInt(value, 10);
    }

    // Renders the CPPE description 
    const renderDescription = (number) => {
        const i = categoryChart.find((i) => i.number === number); 
        if (i){
          return <div key={ i.number}  className="desc" style={{paddingLeft:'20px'}}> {i.description}</div>
        }
        return <div style={{paddingLeft:'20px'}} >  No Comment</div>
    } 

    function id(value: { id: number; title: String; shortDescription: String; Id2: number; }, index: number, array: { id: number; title: String; shortDescription: String; Id2: number; }[]): value is { id: number; title: String; shortDescription: String; Id2: number; } {
        throw new Error('Function not implemented.');
    }

    return (
        <>
        <div className='Alert-container-box'>
            <div className='container'>
                <p className='title'>Conservation Practice(s)</p>
                <div className='dropdown'>
                        <label className='check'>
                            <input type="checkbox"
                                className='selectAll'
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
                        {data.length ? (
                            <div className="conservation-practices">
                                {data.map((item) => (
                                    <CPPESCoreEntry key={hidKey} handleCheckClick={handleCheckClick} handleRowClick={handleRowClick} item={item} 
                                        hiddenKey={hidKey++} activeCheckClass={activeCheckClass} activeClassName={activeClassName}/>                                        
                                ))}
                            </div>
                        ) : (
                            <h1>Loading</h1>
                        )}
                        <div className="details"> 
                            { (flag===false) ?  (<h1>...</h1> ) : (
                            <div className='practice-item'>
                                    <h2><GetElement array={practice} index={0} property={property} /></h2> 
                                    <div className='flexdata' >
                                            {(() => {
                                                let item = getCPPScore(practice, 0 , index); 
                                               
                                                const numericValue = Number(item); 
                                               
                                                let text = `+${item}`;
                                                if ( numericValue > 0 ) return  <div className='green-box'>{text} </div>
                                                else if (numericValue < 0) return <div className='red-box'>{item}</div>
                                                else return <p className='grey-box'>{item}</p>     
                                            })()}
                                        
                                             {(() => {
                                                 let item = getCPPScore(practice, 0 , index);
                                                return renderDescription(item)
                                            })()}        
                                    </div> 
                                    <h3> Practice Information</h3> 
                                    <img className='practice-item' alt='' src="../../../images/landscape-initiatives-images/default.jpg"/>
                                    <p><GetElement array={practice} index={0} property={'shortDescription'} /></p>  
                                            <div className="caution-container"> 
                                            <img src={'../../../../images/ic_error_24px.svg'} alt="Warning" />
                                                <h2> Caution for application</h2>
                                                <p> This practice has a negative effect on the following resource concerns: </p>
                                                <ul>
                                                    <li><Link to={{ pathname: 'https://www.nrcs.usda.gov/Internet/NRCS_RCA/reports/data_viewer_home.html',}} target='_blank' > <text> Placeholder Resource Concern 1</text> </Link></li>
                                                    <li><Link to={{ pathname: 'https://www.nrcs.usda.gov/Internet/NRCS_RCA/reports/data_viewer_home.html',}} target='_blank' > Placeholder Resource Concern 2 </Link></li>
                                                    <li><Link to={{ pathname: 'https://www.nrcs.usda.gov/Internet/NRCS_RCA/reports/data_viewer_home.html',}} target='_blank' > Placeholder Resource Concern 3 </Link></li>
                                                </ul>
                                            </div>  
                            </div>                             
                            )}  
                        </div> 
                    </div>
                </div>
             </div>
         </div>
     </>
    )
}

export default CPPESCoreView;