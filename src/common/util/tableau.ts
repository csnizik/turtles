const verifyTableauIsEmpty = (viz, setTableauIsEmpty) => {
  //getting called from PracticeDetailReport -> initViz() -> onFirstInteractive
  const workbook = viz.getWorkbook();
  const sheet = workbook.getActiveSheet().getWorksheets();

  sheet.map(function (worksheet) {
    return worksheet
      .getSummaryDataAsync({ maxRows: 1 })
      .then(function (table) {
        const dataLength = table.getData().length;
        if (dataLength === 0) setTableauIsEmpty(true);
        else setTableauIsEmpty(false);
      })
      .otherwise(function () {
        setTableauIsEmpty(true);
      });
  });
};

export default verifyTableauIsEmpty;
