import classNames from 'classnames';

import './results.scss';

export const practiceList: any = [
  {
    id: 0,
    practiceName: 'Access Control',
    practiceDescription: 'Sample',
  },
  {
    id: 1,
    practiceName: 'Access Road',
    practiceDescription: 'Sample',
  },
];

const ResultsContainer = () => {
  const renderPracticeAccordion = () => {
    return (
      <ul className='list-group'>
        {practiceList.map((ele: any, index: number) => {
          const listItemClassName = classNames('list-group-item', 'text-left', {
            selected: false,
          });
          const listItemIconClassName = classNames('fas', {
            'fa-chevron-right': true,
            'fa-chevron-down': false,
          });
          return (
            <div key={ele.id}>
              <li key={ele.id} className={listItemClassName}>
                <i
                  className={listItemIconClassName}
                  data-testid={ele.practiceName}
                  onClick={() => console.log('asd')}
                />

                <p className='font-sans-lg margin-left-2'>{`${ele.practiceName}`}</p>
              </li>
            </div>
          );
        })}
      </ul>
    );
  };
  return <div className='results-page'>{renderPracticeAccordion()}</div>;
};

export default ResultsContainer;
