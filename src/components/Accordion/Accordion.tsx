import React, { useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import './accordion.scss';

interface IAccordionRow {
  children: React.ReactNode;
  id: number;
  heading: string;
  description: string;
  link: string;
}

const Accordion = ({
  id,
  heading,
  description,
  link,
  children,
}: IAccordionRow) => {
  const [tab, setTab] = useState(null);

  const toggle = (id: any) => {
    if (tab === id) return setTab(null);
    return setTab(id);
  };

  const chevronClassName = classNames('fas', {
    'fas fa-chevron-right': tab !== id,
    'fas fa-chevron-down': tab === id,
  });

  const borderClassname = classNames({
    'children-right': tab === id,
  });

  return (
    <>
      <div className='accordion-section'>
        <div className='accordion-container'>
          <li
            key={id}
            className={borderClassname}
            onClick={(e: any) => toggle(id)}
          >
            <i className={chevronClassName} />
            <div className='accordion-data'>
              <h4>{heading}</h4>
              <div>
                {tab === id && <p>{description}</p>}
                {tab === id && (
                  <p>
                    <Link to='#'>{link}</Link>
                  </p>
                )}
              </div>
            </div>
          </li>
        </div>
        <div className='children'>
          {tab === id &&
            React.Children.map(children, (child) => (
              <div className='children-section'>{children}</div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Accordion;
