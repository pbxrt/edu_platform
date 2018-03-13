import React from 'react';

import TableView from '../../../commonComponents/table';
import { colorsMap } from '../../../shared/constants';

export default class AreaDetail extends React.Component {
    render() {
        const { tableHeader, tableName } = makeTableInfo();
        const tableData = this.props.targetData.userDisDetail.districts;
        return (
            <div className='section' style={{backgroundColor: colorsMap['B02']}} >
                <div className='section-title'>区县用户分布明细：</div>
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
        { id: 'userCount', name: '总用户数' },
        { id: 'teacherCount', name: '教师' },
        { id: 'studentCount', name: '学生' },
        { id: 'parentCount', name: '家长' }
    ];
    const tableName = '区县用户分布明细';
    return { tableHeader: [mainHeader], tableName };
}