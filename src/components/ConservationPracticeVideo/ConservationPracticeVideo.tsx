import './conservation-practice-video.scss';
import {useGetPracticeVideoLinkQuery} from '../../Redux/services/api';
import Spinner from '../Spinner/Spinner';

const ConservationPracticeVideo = ( {selectedPracticeId} : any) => {
  const { data, error, isLoading, isSuccess, isError } = useGetPracticeVideoLinkQuery(selectedPracticeId);

  return (
    <section className='media-box' data-testid='video-box-container'>
      {isLoading && <Spinner />}
      {isError && error}
      {isSuccess && data && (
        <div className='content'> 
          <h2>{data[0].videoName}</h2>
          <div className='full-component'>
            <div className='video-media' data-testid='video-media'>
              <iframe
              className='video'
              src={data[0].videoLink}
              frameBorder='1'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; X-Frame-Options'
              allowFullScreen
              title={`${data[0].videoName} Embedded Video`}
              />
            </div>
            <div className='video-description'>
              <p className='description'>
                {data[0].videoDescription}
              </p>
              <div className='link'>
                <a
                    href='https://www.farmers.gov/conservation/conservation-at-work/all'
                    target='_blank' rel='noopener noreferrer'
                    // eslint-disable-next-line global-require
                    >All Conservation at Work videos <img alt='All Conservation at Work videos' src={require('./image/newLinkIcon.svg').default}/></a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
      

  )
}

export default ConservationPracticeVideo;