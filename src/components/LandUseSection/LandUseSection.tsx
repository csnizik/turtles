import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Tooltip } from 'reactstrap';
import { ILandUseOption } from '../../common/types';
import './land-use-section.scss';
import { useGetLandUseOptionsQuery } from '../../Redux/services/api';
import { useAppSelector } from '../../Redux/hooks/hooks';

const LandUseSection = ({
  setSearchInput,
  setSearchInfo,
  checkedState,
  setCheckedState,
}: any) => {
  const landUseOptions: any = useGetLandUseOptionsQuery();
  const landUseData: ILandUseOption[] = landUseOptions.data || [];
  const [tooltipOpen, setTooltipOpen]: any = useState([]);
  const [landUse, setLandUse]: any = useState(null);
  const [landUseName, setLandUseName]: any = useState(null);
  const [check, setCheck] = useState(false);

  const { t } = useTranslation();

  const landUseList = useAppSelector(
    (state) => state?.practiceSlice?.searchInput?.land_use_list
  );

  const landUseInfoList = useAppSelector(
    (state) => state?.practiceSlice?.searchInfo?.land_use_list
  );

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
    if (!landUse) {
      setLandUse(landUseList);
      setLandUseName(landUseInfoList);
      if (landUseList != null) {
        window.localStorage.setItem('LandUseId', landUseList);
        window.localStorage.setItem('LandUseName', landUseInfoList);
      } else {
        window.localStorage.removeItem('LandUseId');
        window.localStorage.removeItem('LandUseName');
      }
    }
    if (window.localStorage.getItem('LandUseId')) {
      setLandUse(window.localStorage.getItem('LandUseId'));
    }
    if (window.localStorage.getItem('LandUseName')) {
      setLandUseName(window.localStorage.getItem('LandUseName'));
    }
  }, []);

  useEffect(() => {
    setSearchInput((prevState) => ({
      ...prevState,
      land_use_list: landUse,
    }));
    setSearchInfo((prevState) => ({
      ...prevState,
      land_use_list: landUseName,
    }));
    if (landUse === '') {
      setSearchInput((prevState) => ({
        ...prevState,
        land_use_list: null,
      }));
      setSearchInfo((prevState) => ({
        ...prevState,
        land_use_list: null,
      }));
    }
  }, [landUse]);

  const handleLandUse = (e) => {
    const { value, checked, name } = e.target;
    setCheckedState((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));

    if (checked) {
      if (landUse || (landUse && landUse.indexOf(value) === -1)) {
        setCheck(!check);
        setLandUse((prevState) => `${prevState},${value}`);
        setLandUseName((prevState) => `${prevState},${name}`);
        setSearchInfo((prevState) => ({
          ...prevState,
          land_use_list: landUseName,
        }));
      } else {
        setCheck(!check);
        setLandUse(`${value}`);
        setLandUseName(`${name}`);
        setSearchInfo((prevState) => ({
          ...prevState,
          land_use_list: name,
        }));
      }
      setSearchInput((prevState) => ({
        ...prevState,
        land_use_list: landUse,
      }));
    } else if (!checked) {
      const landUseArr = landUse?.split(',');
      const landUseNameArr = landUseName?.split(',');
      if (landUseArr?.includes(value)) {
        const filteredLandUse = landUseArr?.filter((landId: any) => {
          return landId !== value;
        });
        setLandUse(filteredLandUse.join(','));
      }
      if (landUseNameArr?.includes(name)) {
        const filteredLandUseName = landUseNameArr?.filter((landName: any) => {
          return landName !== name;
        });
        setLandUseName(filteredLandUseName.join(','));
        setSearchInfo((prevState) => ({
          ...prevState,
          land_use_list: filteredLandUseName,
        }));
      }
    } else {
      setSearchInfo((prevState) => ({
        ...prevState,
        land_use_list: null,
      }));
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
                  defaultChecked={
                    check || checkedState[landType.landUseCategoryName]
                  }
                  onChange={handleLandUse}
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
