import React from 'react';

import TableView from '../../../commonComponents/table';

export default class AreaDetail extends React.Component {
    render() {
        const { tableHeader, tableName } = makeTableInfo();
        const tableData = this.props.targetData.assetDisDetail.districts;
        return (
            <div className='section'>
                <div className='section-title'>区县资产分布明细：</div>
                <div style={{ paddingTop: 30}} >
                    <TableView
                        tableHeader={tableHeader}
                        tableName={tableName}
                        downloadkeys={tableHeader[0]}
                        tableData={tableData}
                        headRowClassName={'thead-row-deep'}
                        bodyRowClassName={'tbody-row-deep'}
                        reserveRows
                        cancelTableSort
                    />
                </div>
            </div>
        )
    }
}

function makeTableInfo() {
    let mainHeader = [
        { id: 'district', name: '区县' },
        { id: 'classroom', name: '教室' },
        { id: 'adminClass', name: '行政班' },
        { id: 'adminMeanCount', name: '行政班平均人数' },
        { id: 'teachClass', name: '教学班' },
        { id: 'teachMeanCount', name: '教学班平均人数' }
    ];
    const tableName = '区县用户分布明细';
    return { tableHeader: [mainHeader], tableName };
}