import React from 'react';

import TableView from '../../commonComponents/table';

export default class SchoolCompare extends React.Component {
    render() {
        const { tableHeader, tableName } = makeTableInfo();
        const tableData = this.props.targetData.compareDetail.schools;
        return (
            <div >
                <div style={{width: 1155, margin: '0 auto'}} >
                    <div style={{width: 1155, margin: '0 auto', padding: '40px 0 60px 0'}} >
                        <div className='section-title'>学校师生有效比明细：</div>
                        <div style={{ marginTop: 25 }} >
                            <TableView
                                tableHeader={tableHeader}
                                tableName={tableName}
                                downloadkeys={tableHeader[0]}
                                tableData={tableData}
                                headRowClassName={'thead-row-deep'}
                                bodyRowClassName={'tbody-row-deep'}
                                cancelTableSort
                                reserveRows
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function makeTableInfo() {
    let mainHeader = [
        { id: 'school', name: '学校' },
        { id: 'district', name: '区县' },
        { id: 'teacher', name: '教师' },
        { id: 'student', name: '学生' },
        { id: 'rate', name: '师生有效比' },
        { id: 'districtRate', name: '区县师生有效比' },
        { id: 'cityRate', name: '全市师生有效比' }
    ];
    const tableName = '基础信息';
    return { tableHeader: [mainHeader], tableName };
}