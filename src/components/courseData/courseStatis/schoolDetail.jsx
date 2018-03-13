import React from 'react';

import TableView from '../../../commonComponents/table';
import { colorsMap } from '../../../shared/constants';

export default class AreaDetail extends React.Component {
    render() {
        const { tableHeader, tableName } = makeTableInfo();
        const tableData = this.props.statis.courseDetail.schools;
        return (
            <div className='section' style={{backgroundColor: colorsMap['B02']}} >
                <div className='section-title'>课程学校详细数据：</div>
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
        { id: 'name', name: '学校' },
        { id: 'subjectCount', name: '学科数' },
        { id: 'courseCount', name: '所有课程数' },
        { id: 'required', name: '必修课' },
        { id: 'elective', name: '自选课' }
    ];
    const tableName = '区县用户分布明细';
    return { tableHeader: [mainHeader], tableName };
}