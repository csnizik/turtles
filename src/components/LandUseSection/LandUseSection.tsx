import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Tooltip } from 'reactstrap';

import { ILandUseOption } from '../../common/types';
import './land-use-section.scss';
import { useGetLandUseOptionsQuery } from '../../Redux/services/api';

const LandUseSection = ({ setSearchInput, setSearchInfo }: any) => {
  const landUseOptions: any = useGetLandUseOptionsQuery();
  const landUseData: ILandUseOption[] = landUseOptions.data || [];
  const [tooltipOpen, setTooltipOpen]: any = useState([]);
  const [landUse, setLandUse]: any = useState(null);
  const [check, setCheck] = useState(false);
  const { t } = useTranslation();

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

  useEffect(() => {
    setSearchInput((prevState) => ({
      ...prevState,
      land_use_list: landUse,
    }));
    if (landUse === '') {
      setSearchInput((prevState) => ({
        ...prevState,
        land_use_list: null,
      }));
    }
  }, [landUse]);

  const handleLandUse = (e) => {
    const { value, checked, name } = e.target;
    console.log('Land Use Name-->', name);

    if (checked) {
      if (landUse || (landUse && landUse.indexOf(value) === -1)) {
        setCheck(!check);
        setLandUse((prevState) => `${prevState},${value}`);
        setSearchInfo((prevState) => ({
          ...prevState,
          land_use_list: name,
        }));
      } else {
        setCheck(!check);
        setLandUse(`${value}`);
      }
      setSearchInput((prevState) => ({
        ...prevState,
        land_use_list: landUse,
      }));
    } else {
      const landUseArr = landUse.split(',');
      if (landUseArr.includes(value)) {
        const filteredLandUse = landUseArr?.filter((landId: any) => {
          return landId !== value;
        });
        setLandUse(filteredLandUse.join(','));
      }
    }
  };

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
      <legend className='usa-legend'>
        {t('search-page.filter-by-land-use')}
      </legend>
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
                  name={landType.landUseCategoryName}
                  defaultChecked={check}
                  onClick={handleLandUse}
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
