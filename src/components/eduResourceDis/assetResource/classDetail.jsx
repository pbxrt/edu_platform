import React from 'react';
import _ from 'lodash';

import TableView from '../../../commonComponents/tableView';
import Paginator from '../../../commonComponents/paginator';
import { colorsMap } from '../../../shared/constants';

export default class SchoolDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 66
        }
    }

    handleChange(event) {
        this.setState({ value: event.nativeEvent.target.value })
    }

    handlePageClick(page) {
        console.log(page)
    }

    render() {
        const mockData = makeMockData()
        const { tableHeader, tableName } = makeTableInfo();
        const tableData = makeTableData(mockData);
        return (
            <div className='section' style={{ backgroundColor: 'rgb(17, 43, 132)'}} >
                <div>
                    <span className='section-title'>学校班级学生分布明细：</span>
                    <div style={{ display: 'inline-block', paddingLeft: 500 }} >
                        超过
                        <input type='text'
                            style={{
                                margin: '0 10px',
                                textAlign: 'center',
                                width: 80,
                                height: 30,
                                border: '1px solid #888db3',
                                borderRadius: 2,
                                backgroundColor: 'transparent'
                            }}
                            onChange={this.handleChange.bind(this)}
                            value={this.state.value}
                        />
                        人班级提醒
                    </div>
                </div>
                <div style={{ paddingTop: 25 }} >
                    <TableView tableHeader={tableHeader} tableName={tableName} downloadkeys={tableHeader[0]} tableData={tableData} reserveRows cancelTableSort />
                </div>
                <p style={{ margin: '20px 0'}} >
                    以上标红的班级需注意，2018年教育部部长在全国教育工作会议上提到，要消除66人以上的超大班额。
                </p>
                <Paginator pageCount={15} handlePageClick={this.handlePageClick.bind(this)} />
            </div>
        )
    }
}

function makeTableInfo() {
    let mainHeader = [
        { id: 'area', name: '区县' },
        { id: 'school', name: '学校' },
        { id: 'class', name: '教学班' },
        { id: 'student_count', name: '学生人数', columnStyle: getColumnStyle },
    ];
    _.each(mainHeader, cell => {
        cell.style = { padding: '16px 0 16px 35px', backgroundColor: colorsMap['B08'], fontSize: 14 };
        cell.columnStyle = _.assign({}, cell.style, { padding: '10px 0 12px 35px', backgroundColor: '#113291', borderTop: `1px solid #1344B2` })
    });
    const tableName = '学校班级学生分布明细';
    return { tableHeader: [mainHeader], tableName };
}

function getColumnStyle(id, rowData, tableData) {
    if(rowData[id] >= 66) {
        return { color: '#d5368c' }
    }
}

function makeTableData(mockData) {
    let tableData = [];
    _.each(mockData, (data, areaKey) => {
        let row = _.pick(data, ['area', 'school', 'class', 'student_count']);
        (areaKey === 'all') ? tableData.unshift(row) : tableData.push(row)
    });
    return tableData;
}

function makeMockData() {
    return {
        all: {
            school: '全部',
            area: '全部',
            class: '--',
            student_count: 1000,
        },
        area1: {
            school: '全部',
            area: '全部',
            class: '1班',
            student_count: 500
        },
        area2: {
            school: '全部',
            area: '全部',
            class: '2班',
            student_count: 78
        },
        area3: {
            school: '全部',
            area: '全部',
            class: '2班',
            student_count: 56
        },
        area4: {
            school: '全部',
            area: '全部',
            class: '2班',
            student_count: 45 
        },
        area5: {
            school: '全部',
            area: '全部',
            class: '2班',
            student_count: 67
        },
        area6: {
            school: '全部',
            area: '全部',
            class: '2班',
            student_count: 34 
        },
        area7: {
            school: '全部',
            area: '全部',
            class: '2班',
            student_count: 56 
        }
    }
}