import './land-use-section.scss';
import { Tooltip } from 'reactstrap';
import { useState } from 'react';

interface ILandUseData {
  id: number;
  label: string;
  description: string;
}

const exampleLandUseData: ILandUseData[] = [
<<<<<<< HEAD
  { id: 0, label: 'Cropland' },
  { id: 1, label: 'Rangeland' },
  { id: 2, label: 'Developed Land / Urban Ag' },
  { id: 3, label: 'Forestland' },
  { id: 4, label: 'Pasture' },
  { id: 5, label: 'Other Farm and Rural Land' },
=======
  {
    id: 0,
    label: 'Cropland',
    description: 'Areas used for the production of adapted crops for harvest.',
  },
  {
    id: 1,
    label: 'Rangeland',
    description:
      'Lands on which the indigenous vegetation is predominately grasses, grass-like plants, forbs, and possibly shrubs or dispersed trees.',
  },
  {
    id: 2,
    label: 'Developed Land / Urban Ag',
    description: 'Sample description of Developed Land / Urban Ag.',
  },
  {
    id: 3,
    label: 'Forestland',
    description:
      'Areas composed of an overstory of tree canopy and an understory that is divided into shrub and forb layers.',
  },
  {
    id: 4,
    label: 'Pasture',
    description:
      'Vegetation cover comprised primarily of introduced or enhanced native forage species that is used for livestock grazing.',
  },
  {
    id: 5,
    label: 'Other Farm and Rural Land',
    description: 'Sample description of Other Farm and Rural land.',
  },
>>>>>>> 5643bed5db38c2c1940ae634b9e97c4cb6b92308
];

const LandUseSection = () => {
  const [tooltipOpen, setTooltipOpen] = useState([false]);
<<<<<<< HEAD
  const toggle = (event) => {
    const index = parseInt(event.target.id.split('tooltip')[1], 10);
=======
  const toggleTooltip = (index) => {
>>>>>>> 5643bed5db38c2c1940ae634b9e97c4cb6b92308
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
<<<<<<< HEAD
                  toggle={toggle}
                >
                  Hello World
=======
                  toggle={() => toggleTooltip(landType.id)}
                >
                  {landType.description}
>>>>>>> 5643bed5db38c2c1940ae634b9e97c4cb6b92308
                </Tooltip>
              </div>
            );
          })}
      </div>
    </fieldset>
  );
};

export default LandUseSection;
