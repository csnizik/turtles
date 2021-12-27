import './resource-concern-treated.scss';

const ResourceConcernTags = (category: any) => {
  const ct = category;

  return (
    <div className='content-tag'>
      <div className='tags'>
        {ct.category.map((singleTag: any) => {
          return (
            <img
              className='displaying-image'
              alt={singleTag.landUseName}
              src={`../../../images/resource-concern-tags/${singleTag.landUseIcon}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ResourceConcernTags;
