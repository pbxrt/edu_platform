import React from 'react';
import _ from 'lodash';

import TableView from '../../../commonComponents/tableView';

export default class SchoolDetail extends React.Component {
    render() {
        const { tableHeader, tableName } = makeTableInfo();
        const tableData = this.props.statis.courseDetail.districts;
        return (
            <div className='section' >
                <div className='section-title'>课程区县详细数据：</div>
                <div style={{ paddingTop: 30}} >
                    <TableView   tableHeader={tableHeader} tableName={tableName} downloadkeys={tableHeader[0]} tableData={tableData} reserveRows cancelTableSort />
                </div>
            </div>
        )
    }
}

function makeTableInfo() {
    let mainHeader = [
        { id: 'name', name: '区县' },
        { id: 'subjectCount', name: '学科数' },
        { id: 'courseCount', name: '所有课程数' },
        { id: 'required', name: '必修课' },
        { id: 'elective', name: '自选课' }
    ];
    _.each(mainHeader, cell => {
        cell.style = { padding: '16px 0 16px 35px', backgroundColor: '#123391', fontSize: 14 };
        cell.columnStyle = _.assign({}, cell.style, { padding: '10px 0 12px 35px', backgroundColor: '#112578', borderTop: `1px solid #123391` })
    });
    const tableName = '区县用户分布明细';
    return { tableHeader: [mainHeader], tableName };
}