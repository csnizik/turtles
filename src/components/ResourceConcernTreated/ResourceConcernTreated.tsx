import DetailedDescription from './DetailedDescription';
import './resource-concern-treated.scss';

const ResourceConcernTreated = () => {
  return (
    <>
      <section className='document-box'>
        <h2>Resource Concerns Treated</h2>
        <p>NRCS conservation activities are carried out according to a conservation plan 
          developed with the producer that identifies the appropriate conservation practice or 
          practices to address the resource concerns affecting their farm, ranch, or forest. 
          The resource concerns addressed by this practice are listed below.
        </p>
        
        <div className='accordion-section'>
          <div className='accordion-container'>
            <li>
              <i
                className='fas fa-chevron-right'
                role='presentation'
              />
              <div className='accordion-data'>
                <h4>Air</h4>
              </div>
            </li>
          </div>

          <div className='accordion-container'>
            <li>
              <i
                className='fas fa-chevron-right'
                role='presentation'
              />
              <div className='accordion-data'>
                <h4>Animal</h4>
              </div>
            </li>
          </div>

          <div className='accordion-container'>
            <li>
              <i
                className='fas fa-chevron-right'
                role='presentation'
              />
              <div className='accordion-data'>
                <h4>Plant</h4>
              </div>
            </li>
          </div>
        </div>

        <DetailedDescription/>
      </section>
    </>
  );
};

export default ResourceConcernTreated;
