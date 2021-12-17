import {tableauGraph} from '../../common/typedconstants.common';

interface ITableauReportProps{
    pageName: string;
}

const TableauReport = ({
    pageName,
}:ITableauReportProps) => {

    const option = tableauGraph[pageName];
    const tableauLink = `${option.link}.png`;
    console.log(tableauLink)

    return (
        <img alt={option.displayName} src={tableauLink}/>
    );
}

export default TableauReport;