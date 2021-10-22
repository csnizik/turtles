import { useEffect, useState } from 'react';
import { useAppSelector } from '../../Redux/hooks/hooks';
import './resource-concern-treated.scss';

const ResourceConcernTags = (category: any) => {
  const ct = category;
  const [dataSet, setDataSet] = useState(new Set());

  const fromPdfReport = useAppSelector(
    (state) => state?.pdfGenSlice?.enablePdfGen
  );

  const populateDataset = () => {
    const tempSet = new Set();
    let i = 0;
    for (; i < ct.category.length; i++) {
      tempSet.add(ct.category[i].landUseName);
    }
    setDataSet(tempSet);
  };

  useEffect(() => {
    populateDataset();
  }, []);

  return (
    <div className='content-tag'>
      <div className='tags'>
        <img
          className={
            dataSet.has('Cropland') ? 'displaying-image' : 'hidden-image'
          }
          alt='Cropland Icon'
          src={
            fromPdfReport
              ? // eslint-disable-next-line global-require
                require('./image/Cropland-IconPlaceholder.png').default
              : //eslint-disable-next-line global-require
                require('./image/Cropland-IconPlaceholder.svg').default
          }
        />
        <img
          className={
            dataSet.has('Developed land/Urban Ag')
              ? 'displaying-image'
              : 'hidden-image'
          }
          alt='Developedland Icon'
          src={
            fromPdfReport
              ? // eslint-disable-next-line global-require
                require('./image/DevelopedLand-and-UrbanAg-IconPlaceholder.png')
                  .default
              : // eslint-disable-next-line global-require
                require('./image/DevelopedLand-and-UrbanAg-IconPlaceholder.svg')
                  .default
          }
        />
        <img
          className={
            dataSet.has('Forestland') ? 'displaying-image' : 'hidden-image'
          }
          alt='Forestland Icon'
          src={
            fromPdfReport
              ? // eslint-disable-next-line global-require
                require('./image/Forestland-IconPlaceholder.png').default
              : // eslint-disable-next-line global-require
                require('./image/Forestland-IconPlaceholder.svg').default
          }
        />
        <img
          className={
            dataSet.has('Other Farm and Rural Land')
              ? 'displaying-image'
              : 'hidden-image'
          }
          alt='Other farms and Rural land Icon'
          src={
            fromPdfReport
              ? // eslint-disable-next-line global-require
                require('./image/OtherFarm-and-RuralLand-IconPlaceholder.png')
                  .default
              : // eslint-disable-next-line global-require
                require('./image/OtherFarm-and-RuralLand-IconPlaceholder.svg')
                  .default
          }
        />
        <img
          className={
            dataSet.has('Pasture') ? 'displaying-image' : 'hidden-image'
          }
          alt='Pasture Icon'
          src={
            fromPdfReport
              ? // eslint-disable-next-line global-require
                require('./image/Pasture-IconPlaceholder.png').default
              : // eslint-disable-next-line global-require
                require('./image/Pasture-IconPlaceholder.svg').default
          }
        />
        <img
          className={
            dataSet.has('Rangeland') ? 'displaying-image' : 'hidden-image'
          }
          alt='Rangeland Icon'
          src={
            fromPdfReport
              ? // eslint-disable-next-line global-require
                require('./image/Rangeland-IconPlaceholder.png').default
              : // eslint-disable-next-line global-require
                require('./image/Rangeland-IconPlaceholder.svg').default
          }
        />
      </div>
    </div>
  );
};

export default ResourceConcernTags;
