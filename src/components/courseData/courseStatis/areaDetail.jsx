import React from 'react';
import _ from 'lodash';

import TableView from '../../../commonComponents/tableView';

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
                <div className='section-title'>区县用户分布明细：</div>
                <div style={{ paddingTop: 30}} >
                    <TableView   tableHeader={tableHeader} tableName={tableName} downloadkeys={tableHeader[0]} tableData={tableData} reserveRows cancelTableSort />
                </div>
            </div>
        )
    }
}

function makeTableInfo() {
    let mainHeader = [
        { id: 'area', name: '区县' },
        { id: 'user_count', name: '总用户数' },
        { id: 'teacher', name: '教师' },
        { id: 'student', name: '学生' },
        { id: 'parent', name: '家长' }
    ];
    _.each(mainHeader, cell => {
        cell.style = { padding: '16px 0 16px 35px', backgroundColor: '#123391', fontSize: 14 };
        cell.columnStyle = _.assign({}, cell.style, { padding: '10px 0 12px 35px', backgroundColor: '#112578', borderTop: `1px solid #123391` })
    });
    const tableName = '区县用户分布明细';
    return { tableHeader: [mainHeader], tableName };
}

function makeTableData(mockData) {
    let tableData = [];
    _.each(mockData, (data, areaKey) => {
        let row = _.pick(data, ['user_count', 'teacher', 'student', 'parent']);
        row.area = data.name;
        (areaKey === 'all') ? tableData.unshift(row) : tableData.push(row)
    });
    return tableData;
}

function makeMockData() {
    return {
        all: {
            name: '全部',
            user_count: 3000,
            teacher: 1000,
            student: 1000,
            parent: 1000
        },
        area1: {
            name: '区县1',
            user_count: 3000,
            teacher: 1000,
            student: 1000,
            parent: 1000  
        },
        area2: {
            name: '区县2',
            user_count: 3000,
            teacher: 1000,
            student: 1000,
            parent: 1000  
        },
        area3: {
            name: '区县3',
            user_count: 3000,
            teacher: 1000,
            student: 1000,
            parent: 1000  
        },
        area4: {
            name: '区县4',
            user_count: 3000,
            teacher: 1000,
            student: 1000,
            parent: 1000  
        },
        area5: {
            name: '区县5',
            user_count: 3000,
            teacher: 1000,
            student: 1000,
            parent: 1000  
        },
        area6: {
            name: '区县6',
            user_count: 3000,
            teacher: 1000,
            student: 1000,
            parent: 1000  
        },
        area7: {
            name: '区县7',
            user_count: 3000,
            teacher: 1000,
            student: 1000,
            parent: 1000  
        }
    }
}
