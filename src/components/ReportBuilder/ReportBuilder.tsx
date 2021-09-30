import { useEffect, useState } from 'react';
import './report-builder.scss';

const ReportBuilder = ({
  swapaData,
  choiceInputs,
  setChoiceInputs,
  rcTreatedInputs,
  setRcTreatedInput,
  getRCTreatedComponent,
  reportPreviewData,
  handleGeneratePdf,
}: any) => {
  const swapaCategoryCnt = swapaData?.result.length;
  const [swapaCategoryIds, setSwapaCategoryIds] = useState(new Set());

  const collectSwapaCategoryIds = () => {
    const tempSet = new Set();
    swapaData?.result.forEach((childData) => {
      tempSet.add(childData.rcCategoryId)
    })
    
    setSwapaCategoryIds(tempSet);
  }

  useEffect(() => {
    collectSwapaCategoryIds();
  }, []);

  const handleInput = (e) => {
    const { value, checked } = e.target;
    const newChoiceInput = {
      ...choiceInputs,
      [`input${Number(value) + 1}`]: checked,
    };
    setChoiceInputs(newChoiceInput);
  };

  const toggleAll = () => {
    const tempSet = new Set();

    if (rcTreatedInputs.size < swapaCategoryCnt) {
      swapaCategoryIds.forEach((id) => {
        tempSet.add(id);
      })
      setRcTreatedInput(tempSet);
      getRCTreatedComponent(tempSet);
      return;
    }

    setRcTreatedInput(new Set());
    getRCTreatedComponent(new Set());
  };

  const toggleSingle = (categoryId: any) => {
    const tempSet = new Set();
    swapaCategoryIds.forEach((id) => {
      if (rcTreatedInputs.has(id)) tempSet.add(id);
    })

    if (rcTreatedInputs.has(categoryId)) tempSet.delete(categoryId);
    else tempSet.add(categoryId);
    setRcTreatedInput(tempSet);
    getRCTreatedComponent(tempSet);
  };

  const getIdName = (index: any) => {
    return `swapaInput${index}`;
  };

  const buildCheckboxList = (swapaCategory) => {
    const allInput = (
      <div className='usa-checkbox'>
        <input
          className='usa-checkbox__input'
          id='swapaInputAll'
          type='checkbox'
          name='swapaInputAll'
          value='All'
          checked={rcTreatedInputs.size >= swapaCategoryCnt}
          onChange={() => toggleAll()}
        />
        <label className='usa-checkbox__label' htmlFor='swapaInputAll'>
          All
        </label>
      </div>
    );
    const part2 = swapaCategory?.result.map((item, index) => {
      return (
        <div key={item.rcCategoryId} className='usa-checkbox'>
          <input
            className='usa-checkbox__input'
            id={getIdName(index)}
            type='checkbox'
            name={getIdName(index)}
            value={item.rcCategoryId}
            checked={rcTreatedInputs.has(item.rcCategoryId)}
            onChange={() => toggleSingle(item.rcCategoryId)}
          />
          <label className='usa-checkbox__label' htmlFor={`swapaInput${index}`}>
            {item.rcCategoryName}
          </label>
        </div>
      );
    });
    return (
      <>
        {' '}
        {allInput}
        {part2}
      </>
    );
  };

  return (
    <div className='builder-container'>
      <div className='checkbox-container'>
        <div className='usa-checkbox'>
          <input
            className='usa-checkbox__input'
            id='input1'
            type='checkbox'
            name='input1'
            value={0}
            onChange={handleInput}
          />
          <label className='usa-checkbox__label' htmlFor='input1'>
            Practice Overview
          </label>
        </div>
        <div>Resource Concerns Treated</div>

        <div className='swapa-checkbox-list'>
          {buildCheckboxList(swapaData)}
        </div>

        <div className='usa-checkbox'>
          <input
            className='usa-checkbox__input'
            id='input2'
            type='checkbox'
            name='input2'
            value={1}
            onChange={handleInput}
          />
          <label className='usa-checkbox__label' htmlFor='input2'>
            {`Support for ${reportPreviewData?.practiceName} in Colorado`}
          </label>
        </div>

        <div className='usa-checkbox'>
          <input
            className='usa-checkbox__input'
            id='input3'
            type='checkbox'
            name='input3'
            value={2}
            onChange={handleInput}
          />
          <label className='usa-checkbox__label' htmlFor='input3'>
            {`${reportPreviewData?.practiceName} Specifications & Tools`}
          </label>
        </div>

        <div className='usa-checkbox'>
          <input
            className='usa-checkbox__input'
            id='input4'
            type='checkbox'
            name='input4'
            value={3}
            onChange={handleInput}
          />
          <label className='usa-checkbox__label' htmlFor='input4'>
            {`Impacts of Applying ${reportPreviewData?.practiceName} in Colorado`}
          </label>
        </div>

        <div className='usa-checkbox'>
          <input
            className='usa-checkbox__input'
            id='input5'
            type='checkbox'
            name='input5'
            value={4}
            onChange={handleInput}
          />
          <label className='usa-checkbox__label' htmlFor='input5'>
            {`${reportPreviewData?.practiceName} Projects & Initiatives in Colorado`}
          </label>
        </div>
      </div>
      <button
        className='pdf-button'
        onClick={() => handleGeneratePdf()}
        type='button'
      >
        Download Report
      </button>
    </div>
  );
};

export default ReportBuilder;
