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

export const verifyUrlIsValid = (url) => {
  //eslint-disable-next-line
  var res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null)
}

export default verifyTableauIsEmpty;
