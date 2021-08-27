import { useState, useEffect } from 'react';
import { Tooltip } from 'reactstrap';

import { ILandUseOption } from '../../common/types';
import './land-use-section.scss';
import { useGetLandUseOptionsQuery } from '../../Redux/services/api';

const LandUseSection = () => {
  const landUseOptions: any = useGetLandUseOptionsQuery();
  const landUseData: ILandUseOption[] = landUseOptions.data || [];
  const [tooltipOpen, setTooltipOpen]: any = useState([]);

  useEffect(() => {
    if (landUseData.length) {
      const toolTipMap: any =
        landUseData.length &&
        landUseData.map((item: ILandUseOption) => {
          return { id: item.landUseCategoryID, displayTooltip: false };
        });
      setTooltipOpen(toolTipMap);
    }
  }, [landUseData]);

  const toggleTooltip = (index: number) => {
    const updatedTooltips = tooltipOpen.map((tooltip: any) => {
      return tooltip.id === index
        ? { ...tooltip, displayTooltip: !tooltip.displayTooltip }
        : tooltip;
    });
    setTooltipOpen(updatedTooltips);
  };

  return (
    <fieldset className='usa-fieldset'>
      <legend className='usa-legend'>Filter By Land Use</legend>
      <div className='land-use-grid'>
        {landUseOptions.isSuccess &&
          landUseData.length &&
          tooltipOpen.length &&
          landUseData.map((landType: ILandUseOption) => {
            const landId: number = landType.landUseCategoryID;
            const tooltipIndex: number = tooltipOpen.findIndex(
              (tooltip: any) => {
                return tooltip.id === landId;
              }
            );
            return (
              <div className='usa-checkbox' key={landId}>
                <input
                  className='usa-checkbox__input'
                  id={`landUseOption${landId}`}
                  type='checkbox'
                  name='land-use'
                  value={landId}
                />
                <label
                  className='usa-checkbox__label'
                  htmlFor={`landUseOption${landId}`}
                >
                  {landType.landUseCategoryName}
                </label>
                <i
                  className='fas fa-info-circle'
                  aria-hidden='true'
                  id={`tooltip${landId}`}
                />
                <Tooltip
                  placement='right'
                  isOpen={tooltipOpen[tooltipIndex].displayTooltip}
                  target={`tooltip${landId}`}
                  toggle={() => toggleTooltip(landId)}
                >
                  {landType.landUseCategoryDesc}
                </Tooltip>
              </div>
            );
          })}
      </div>
    </fieldset>
  );
};

export default LandUseSection;
