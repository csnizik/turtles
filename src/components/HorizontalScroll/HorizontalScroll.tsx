import { useRef, useState } from 'react';
import './horizontal-scroll.scss';
import { IConservationPracticeSections } from '../../common/types';
import { ConservationPracticeSections } from '../../common/typedconstants.common';

const HorizontalScroll = () => {
  const [sectionState] = useState<IConservationPracticeSections[]>(
    ConservationPracticeSections
  );

  const [classState, setClassState]: any = useState('left-button-default');

  // Need to do some research to find an alternative (better) solution
  const ref = useRef(document.createElement('div'));

  const handleNav = (direction) => {
    if (direction === 'left') {
      ref.current.scrollLeft -= 50;
    }
    if (direction === 'right') {
      ref.current.scrollLeft += 50;
      setClassState('left-button');
    }
  };

  return (
    <div className='horizontal-scroll'>
      <hr className='top-border' />
      <div>
        <button
          className={classState}
          type='button'
          onClick={() => handleNav('left')}
        >
          <i className='fa fa-lg fa-chevron-left button_left' />
        </button>
      </div>
      <div className='scroll_container' ref={ref}>
        <p className='title'>On this page:</p>
        {sectionState.length &&
          sectionState.map((section: IConservationPracticeSections) => {
            return (
              <a key={section.sectionId} href={section.anchorLink}>
                <p className='skin_option'>{section.sectionName}</p>
              </a>
            );
          })}
      </div>
      <div>
        <button
          className='right-button'
          type='button'
          onClick={() => handleNav('right')}
        >
          <i className='fa fa-lg fa-chevron-right' />
        </button>
      </div>
      <hr />
    </div>
  );
};

export default HorizontalScroll;
