import './conservation-practice-overview.scss';
import { useGetPracticesQuery/*, useGetPracticeVideoLinkQuery*/ } from '../../Redux/services/api';
import Spinner from '../Spinner/Spinner';
import image from './image/diversion Image.jpeg';
import newLinkIcon from './image/newLink Icon.svg';

const ConservationPracticeOverview = () => {
  const { data, error, isLoading, isSuccess, isError } = useGetPracticesQuery();
  // const { mediaData } = useGetPracticeVideoLinkQuery();

  return (
    <>
      {isLoading && <Spinner />}
      {isError && error}
      {isSuccess && data && (
        <>
          <div className='document-box'>
            <ul className='list-document'>
              <div key={data[19].practiceId} className='full-component'>
                <div className='overview'>
                  <h4>Diversion 362</h4>
                  <p>{data[19].practiceOverview}</p>
                  <h4>Practice Information</h4>
                  <p>{data[19].practiceInfo}</p>
                </div>
                <img alt='Practice' src={image} />
              </div>
            </ul>
          </div>
          
          <div className='media-box'>
            <div className='content'>
              <h2>Conservation at Work</h2>
              <div className='full-component'>
                <div className='video-media'>
                  <iframe
                    className='video'
                    src='https://www.youtube.com/embed/NLoEkcbsJLo'
                    frameBorder='1'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                    title='Embedded youtube'
                  />
                </div>
                <div className='video-description'>
                  <p className='description'>
                    A Cover Crop is a non-cash crop planted to keep ground covered. 
                    Charlie Roberts in Halls, TN is using this practice to protect 
                    soil health and increase water infiltration.</p>
                  <div className='link'>
                    <a
                    href='https://www.farmers.gov/conservation/conservation-at-work/all'
                    target='_blank' rel='noopener noreferrer'
                    >All Conservation at Work videos <img alt='Link' src={newLinkIcon}/></a>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </>
      )}
    </>
  );
};

export default ConservationPracticeOverview;
