import './land-use-section.scss';

interface ILandUseData {
  id: number;
  label: string;
}

const exampleLandUseData: ILandUseData[] = [
  { id: 0, label: 'Crop' },
  { id: 1, label: 'Forest' },
  { id: 2, label: 'Farm and Other Rural' },
  { id: 3, label: 'Range' },
  { id: 4, label: 'Pasture' },
];

const LandUseSection = () => {
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
              </div>
            );
          })}
      </div>
    </fieldset>
  );
};

export default LandUseSection;
