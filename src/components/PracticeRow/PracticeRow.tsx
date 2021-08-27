import classNames from 'classnames';
import './practice-row.scss';

const PracticeRow = ({ handleRowSelect, rowData }: any) => {
  const rowContentClassNames = classNames(
    'list-group-item',
    'font-serif-md',
    'row-content'
  );
  return (
    <div
      onClick={() => handleRowSelect(rowData.id)}
      className={rowContentClassNames}
      role='presentation'
    >
      <span>{rowData.displayLabel}</span>
    </div>
  );
};

export default PracticeRow;
