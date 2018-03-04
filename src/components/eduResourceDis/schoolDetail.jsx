import React from 'react';
import _ from 'lodash';

import TableView from '../../commonComponents/tableView';

export default class SchoolDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const mockData = makeMockData()
        const { tableHeader, tableName } = makeTableInfo();
        const tableData = makeTableData(mockData);
        return (
            <div className='section' >
                <div style={{ width: 1320, paddingLeft: 165, margin: '0 auto' }} >
                    <div className='section-title'>学校用户分布明细：</div>
                    <div style={{ paddingTop: 30}} >
                        <TableView   tableHeader={tableHeader} tableName={tableName} downloadkeys={tableHeader[0]} tableData={tableData} reserveRows cancelTableSort />
                    </div>
                </div>
            </div>
        )
    }
}

function makeTableInfo() {
    let mainHeader = [
        { id: 'school', name: '学校' },
        { id: 'area', name: '区县' },
        { id: 'user_count', name: '总用户数' },
        { id: 'teacher', name: '教师' },
        { id: 'student', name: '学生' },
        { id: 'parent', name: '家长' }
    ];
    _.each(mainHeader, cell => {
        cell.style = { padding: '16px 0 16px 35px', backgroundColor: '#123391', fontSize: 14 };
        cell.columnStyle = _.assign({}, cell.style, { padding: '10px 0 12px 35px', backgroundColor: '#112578', borderTop: `1px solid #112391` })
    });
    const tableName = '区县用户分布明细';
    return { tableHeader: [mainHeader], tableName };
}

function makeTableData(mockData) {
    let tableData = [];
    _.each(mockData, (data, areaKey) => {
        let row = _.pick(data, ['school', 'area', 'user_count', 'teacher', 'student', 'parent']);
        (areaKey === 'all') ? tableData.unshift(row) : tableData.push(row)
    });
    return tableData;
}

function makeMockData() {
    return {
        all: {
            school: '全部',
            area: '全部',
            user_count: 3000,
            teacher: 1000,
            student: 1000,
            parent: 1000
        },
        area1: {
            school: '学校1',
            area: '区县1',
            user_count: 3000,
            teacher: 1000,
            student: 1000,
            parent: 1000  
        },
        area2: {
            school: '学校2',
            area: '区县2',
            user_count: 3000,
            teacher: 1000,
            student: 1000,
            parent: 1000  
        },
        area3: {
            school: '学校3',
            area: '区县3',
            user_count: 3000,
            teacher: 1000,
            student: 1000,
            parent: 1000  
        },
        area4: {
            school: '学校4',
            area: '区县4',
            user_count: 3000,
            teacher: 1000,
            student: 1000,
            parent: 1000  
        },
        area5: {
            school: '学校5',
            area: '区县5',
            user_count: 3000,
            teacher: 1000,
            student: 1000,
            parent: 1000  
        },
        area6: {
            school: '学校6',
            area: '区县6',
            user_count: 3000,
            teacher: 1000,
            student: 1000,
            parent: 1000  
        },
        area7: {
            school: '学校7',
            area: '区县7',
            user_count: 3000,
            teacher: 1000,
            student: 1000,
            parent: 1000  
        }
    }
}