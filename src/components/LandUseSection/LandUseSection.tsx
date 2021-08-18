import './land-use-section.scss';
import { Tooltip } from 'reactstrap';
import { useState } from 'react';

interface ILandUseData {
  id: number;
  label: string;
}

const exampleLandUseData: ILandUseData[] = [
  { id: 0, label: 'Cropland' },
  { id: 1, label: 'Rangeland' },
  { id: 2, label: 'Developed Land / Urban Ag' },
  { id: 3, label: 'Forestland' },
  { id: 4, label: 'Pasture' },
  { id: 5, label: 'Other Farm and Rural Land' },
];

const LandUseSection = () => {
  const [tooltipOpen, setTooltipOpen] = useState([false]);
  const toggle = (event) => {
    const index = parseInt(event.target.id.split('tooltip')[1], 10);
    const newTipOpen = [...tooltipOpen];
    newTipOpen[index] = !newTipOpen[index];
    setTooltipOpen(newTipOpen);
  };

  return (
    <fieldset className='usa-fieldset'>
      <legend className='usa-legend'>Filter By Land Use</legend>
      <div className='land-use-grid'>
        {exampleLandUseData.length &&
          exampleLandUseData.map((landType: ILandUseData) => {
            return (
              <div className='usa-checkbox' key={landType.id}>
                <input
                  className='usa-checkbox__input'
                  id={`landUseExample${landType.id}`}
                  type='checkbox'
                  name='land-use'
                  value={landType.id}
                />
                <label
                  className='usa-checkbox__label'
                  htmlFor={`landUseExample${landType.id}`}
                >
                  {landType.label}
                </label>
                <i
                  className='fas fa-info-circle'
                  aria-hidden='true'
                  id={`tooltip${landType.id}`}
                />

                <Tooltip
                  placement='right'
                  isOpen={tooltipOpen[landType.id]}
                  target={`tooltip${landType.id}`}
                  toggle={toggle}
                >
                  Hello World
                </Tooltip>
              </div>
            );
          })}
      </div>
    </fieldset>
  );
};

export default LandUseSection;
