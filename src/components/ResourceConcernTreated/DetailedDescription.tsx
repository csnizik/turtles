import './resource-concern-treated.scss';
import ResourceConcernTags from './ResourceConcernTags';

const DetailedDescription = () => {
  return (
    <>
      <section className='child-accordion'>
        <div className='single-content'>
          <div className='content-description'>
            <h4>Aggregate Instability</h4>
            <p>Management-induced degradation of water stable soil aggregates resulting in destabilized soil carbon; 
              surface crusting; reduced water infiltration, water holding capacity, and aeration; 
              depressed resilience to extreme weather; 
              increased ponding and flooding; increased soil erosion and plant stress; and reduced habitat and soil biological activity.
            </p>
          </div>
          <ResourceConcernTags cropLandTag='true' developedLandTag='true' forestLandTag='true' ruralLandTag='true' pastureTag='true'/>
        </div>
        
        <div className='single-content'>
          <div className='content-description'>
            <h4>Compaction</h4>
            <p>Management-induced soil compaction at any level throughout the soil profile resulting in reduced plant productivity, 
              biological activity, infiltration and aeration.
            </p>
          </div>
          <ResourceConcernTags cropLandTag='true' developedLandTag='false' forestLandTag='false' ruralLandTag='true' pastureTag='true'/>
        </div>

        <div className='single-content'>
          <div className='content-description'>
            <h4>Concentration of salts or other chemicals</h4>
            <p>Concentration of salts leading to salinity and/or sodicity reducing productivity or limiting desired use, 
              or concentrations of other chemicals impacting productivity, populations of beneficial organisms or limiting desired use.
            </p>
          </div>
          <ResourceConcernTags cropLandTag='f' developedLandTag='true' forestLandTag='f' ruralLandTag='f' pastureTag='f'/>
        </div>
      </section>
    </>
  );
};

export default DetailedDescription;
