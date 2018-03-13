import React from 'react';

import TableView from '../../../commonComponents/table';

export default class SchoolDetail extends React.Component {
    render() {
        const { tableHeader, tableName } = makeTableInfo();
        const tableData = this.props.targetData.userDisDetail.schools;
        return (
            <div className='section' >
                <div className='section-title'>学校用户分布明细：</div>
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
        { id: 'school', name: '学校' },
        { id: 'district', name: '区县' },
        { id: 'userCount', name: '总用户数' },
        { id: 'teacherCount', name: '教师' },
        { id: 'studentCount', name: '学生' },
        { id: 'parentCount', name: '家长' }
    ];
    const tableName = '区县用户分布明细';
    return { tableHeader: [mainHeader], tableName };
}