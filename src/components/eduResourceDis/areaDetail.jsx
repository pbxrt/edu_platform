import React from 'react';
import _ from 'lodash';

import TableView from '../../commonComponents/tableView';
import { colorsMap } from '../../shared/constants';

export default class AreaDetail extends React.Component {
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
            <div className='section' style={{backgroundColor: colorsMap['B02']}} >
                <div style={{ width: 1320, paddingLeft: 165, margin: '0 auto' }} >
                    <div className='section-title'>区县用户分布明细：</div>
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
        { id: 'area', name: '区县' },
        { id: 'user_count', name: '总用户数' },
        { id: 'teacher', name: '教师' },
        { id: 'student', name: '学生' },
        { id: 'parent', name: '家长' }
    ];
    _.each(mainHeader, cell => {
        cell.style = { padding: '16px 0 16px 35px', backgroundColor: colorsMap['B08'], fontSize: 14 };
        cell.columnStyle = _.assign({}, cell.style, { padding: '10px 0 12px 35px', backgroundColor: '#113291', borderTop: `1px solid #1344B2` })
        if(cell.id === 'area') {
            _.assign(cell.columnStyle, { borderLeft: '5px solid #113291' })
        }
        if(cell.id === 'parent') {
            _.assign(cell.columnStyle, { borderRight: '5px solid #113291' })   
        }
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