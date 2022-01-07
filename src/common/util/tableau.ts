const verifyTableauIsEmpty = (viz, setTableauIsEmpty) => {
  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();

  //SheetType: WORKSHEET, DASHBOARD, STORY. Each has different api methods
  if (activeSheet.getSheetType() === 'worksheet') {
    return activeSheet
      .getSummaryDataAsync({ maxRows: 1 })
      .then((table) => {
        const dataLength = table.getData().length;
        if (dataLength === 0) setTableauIsEmpty(true);
        else setTableauIsEmpty(false);
      })
      .otherwise(() => {
        setTableauIsEmpty(true);
      });
  }

  const sheet = activeSheet.getWorksheets();
  sheet.map((worksheet) => {
    return worksheet
      .getSummaryDataAsync({ maxRows: 1 })
      .then((table) => {
        const dataLength = table.getData().length;
        if (dataLength === 0) setTableauIsEmpty(true);
        else setTableauIsEmpty(false);
      })
      .otherwise(() => {
        setTableauIsEmpty(true);
      });
  });

  return null;
};

export default verifyTableauIsEmpty;
