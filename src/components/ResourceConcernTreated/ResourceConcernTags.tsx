import './resource-concern-treated.scss';

const ResourceConcernTags = ( {cropLandTag, developedLandTag, forestLandTag, ruralLandTag, pastureTag} : any) => {
    return (
      <>
        <div className='content-tag'>
          <div className='tags'>
            <img 
              className={ cropLandTag==='true'? 'displaying-image' : 'hidden-image'}
              alt='Cropland Icon'
              // eslint-disable-next-line global-require
              src={require('./image/Cropland-IconPlaceholder.svg').default}
            />
            <img 
              className={ developedLandTag==='true'? 'displaying-image' : 'hidden-image'}
              alt='Developedland Icon'
              // eslint-disable-next-line global-require
              src={require('./image/DevelopedLand-and-UrbanAg-IconPlaceholder.svg').default}
            />
            <img 
              className={ forestLandTag==='true'? 'displaying-image' : 'hidden-image'}
              alt='Forestland Icon'
              // eslint-disable-next-line global-require
              src={require('./image/Forestland-IconPlaceholder.svg').default}
            />
            <img 
              className={ ruralLandTag==='true'? 'displaying-image' : 'hidden-image'}
              alt='Other farms and Rural land Icon'
              // eslint-disable-next-line global-require
              src={require('./image/OtherFarm-and-RuralLand-IconPlaceholder.svg').default}
            />
            <img 
              className={ pastureTag==='true'? 'displaying-image' : 'hidden-image'}
              alt='Pasture Icon'
              // eslint-disable-next-line global-require
              src={require('./image/Pasture-IconPlaceholder.svg').default}
            />
          </div>
        </div>
      </>
    );
}

export default ResourceConcernTags;