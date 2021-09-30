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
  // console.log('swapaData: ', swapaData);
  // console.log('choiceInputs: ', choiceInputs);
  // console.log('setChoiceInputs: ', setChoiceInputs);
  // console.log('rcTreatedInputs: ', rcTreatedInputs);
  // console.log('setRcTreatedInput: ', setRcTreatedInput);
  // console.log('getRCTreatedComponent: ', getRCTreatedComponent);
  // console.log('reportPreviewData: ', reportPreviewData);
  // console.log('handleGeneratePdf: ', handleGeneratePdf);

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

    if (rcTreatedInputs.size < 5) {
      let i = 1;
      for (; i < 6; i++) {
        tempSet.add(i);
      }
      setRcTreatedInput(tempSet);
      getRCTreatedComponent(tempSet);
      return;
    }

    setRcTreatedInput(new Set());
    getRCTreatedComponent(new Set());
  };

  const toggleSingle = (categoryId: any) => {
    const tempSet = new Set();
    let i = 1;
    for (; i < 6; i++) {
      if (rcTreatedInputs.has(i)) tempSet.add(i);
    }

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
          checked={rcTreatedInputs.size === 5}
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
        Save
      </button>
    </div>
  );
};

export default ReportBuilder;
