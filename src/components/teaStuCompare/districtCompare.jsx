import React from 'react';

import { colorsMap } from '../../shared/constants';
import TableView from '../../commonComponents/table';

export default class DistrictCompare extends React.Component {
    render() {
        const { tableHeader, tableName } = makeTableInfo();
        const tableData = this.props.targetData.compareDetail.districts;
        return (
            <div style={{backgroundColor: colorsMap['B02']}} >
                <div style={{width: 1155, margin: '0 auto', padding: '40px 0 60px 0'}} >
                    <div className='section-title'>区县师生对比明细：</div>
                    <div style={{ marginTop: 25 }} >
                        <TableView
                            tableHeader={tableHeader}
                            tableName={tableName}
                            downloadkeys={tableHeader[0]}
                            tableData={tableData}
                            headRowClassName={'thead-row-light'}
                            bodyRowClassName={'tbody-row-light'}
                            cancelTableSort
                            reserveRows
                        />
                    </div>
                </div>
            </div>
        )
    }
}

function makeTableInfo() {
    let mainHeader = [
        { id: 'district', name: '区县' },
        { id: 'teacher', name: '教师' },
        { id: 'student', name: '学生' },
        { id: 'rate', name: '有效比' }
    ];
    const tableName = '基础信息';
    return { tableHeader: [mainHeader], tableName };
}