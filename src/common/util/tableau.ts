const verifyTableauIsEmpty = (viz, setTableauIsEmpty) => {
  //getting called from PracticeDetailReport -> initViz() -> onFirstInteractive
  const workbook = viz.getWorkbook();
  const sheet = workbook.getActiveSheet().getWorksheets();

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
};

export default verifyTableauIsEmpty;
