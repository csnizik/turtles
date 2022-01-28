import './resource-concern-treated.scss';
import ResourceConcernTags from './ResourceConcernTags';

const DetailedDescription = (resourceConcerns: any) => {
  const rc = resourceConcerns;

  return (
    <>
      {rc && (
        <section className='child-accordion'>
          {rc.resourceConcerns.map((resourceConcern: any) => {
            return (
              <div className='single-content' key={resourceConcern.rcId}>
                <div className='content-description'>
                  <p>{resourceConcern.rcName}</p>
                  <p>{resourceConcern.rcDescription}</p>
                </div>
                <ResourceConcernTags
                  category={resourceConcern.relatedLandUses}
                />
              </div>
            );
          })}
        </section>
      )}
    </>
  );
};

export default DetailedDescription;
