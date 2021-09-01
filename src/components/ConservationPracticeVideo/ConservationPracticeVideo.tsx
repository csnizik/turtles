import './conservation-practice-video.scss';
//import {useGetPracticeVideoLinkQuery} from '../../Redux/services/api';
import newLinkIcon from './image/newLink Icon.svg';

const ConservationPracticeVideo = () => {
    // const { data } = useGetPracticeVideoLinkQuery();

  return (
    <section className='media-box'>
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
              soil health and increase water infiltration.
            </p>
            <div className='link'>
              <a
                  href='https://www.farmers.gov/conservation/conservation-at-work/all'
                  target='_blank' rel='noopener noreferrer'
                  >All Conservation at Work videos <img alt='Link' src={newLinkIcon}/></a>
              {/* should switch to Link in the future */}
            </div>
          </div>
        </div>
      </div>
    </section>      
  )
}

export default ConservationPracticeVideo;