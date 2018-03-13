import React from 'react';

import { colorsMap } from '../../../shared/constants';
import TableView from '../../../commonComponents/table';

export default class SchoolDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { tableHeader, tableName } = makeTableInfo();
        const tableData = this.props.targetData.assetDisDetail.schools;
        return (
            <div className='section' style={{backgroundColor: colorsMap['B02']}} >
                <div className='section-title'>学校资产分布明细：</div>
                <div style={{ paddingTop: 30}} >
                    <TableView
                        tableHeader={tableHeader}
                        tableName={tableName}
                        downloadkeys={tableHeader[0]}
                        tableData={tableData}
                        headRowClassName={'thead-row-light'}
                        bodyRowClassName={'tbody-row-light'}
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
        { id: 'school', name: '学校' },
        { id: 'classroom', name: '教室' },
        { id: 'adminClass', name: '行政班' },
        { id: 'adminMeanCount', name: '行政班平均人数' },
        { id: 'teachClass', name: '教学班' },
        { id: 'teachMeanCount', name: '教学班平均人数' }
    ];
    const tableName = '区县用户分布明细';
    return { tableHeader: [mainHeader], tableName };
}