import './conservation-practice-video.scss';
import {useGetPracticeVideoLinkQuery} from '../../Redux/services/api';
import Spinner from '../Spinner/Spinner';

const ConservationPracticeVideo = ( {selectedPracticeId} : any) => {
  const { data, error, isLoading, isSuccess, isError } = useGetPracticeVideoLinkQuery(selectedPracticeId);

  const youtubeParser = (url: any) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match&&match[7].length===11)? `http://www.youtube.com/embed/${match[7]}` : url;
  }

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
              src={youtubeParser(`${data[0].videoLink}`)}
              frameBorder='1'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
              title='Embedded youtube'
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
                    >All Conservation at Work videos <img alt='Link' src={require('./image/newLinkIcon.svg').default}/></a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
      

  )
}

export default ConservationPracticeVideo;