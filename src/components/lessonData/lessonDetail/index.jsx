import React from 'react';
import _ from 'lodash';

import TableView from '../../../commonComponents/tableView';
import Paginator from '../../../commonComponents/paginator';
import Header from './header';

const periodOptions = [
    { value: '2017-2018年上学期1', label: '2017-2018年上学期1' },
    { value: '2017-2018年上学期2', label: '2017-2018年上学期2' },
    { value: '2017-2018年上学期3', label: '2017-2018年上学期3' },
    { value: '2017-2018年上学期4', label: '2017-2018年上学期4' },
    { value: '2017-2018年上学期5', label: '2017-2018年上学期5' }
]

const subjectOptions = [
    { value: '全科', label: '全科' },
    { value: '数学', label: '数学' },
    { value: '英语', label: '英语' },
    { value: '语文', label: '语文' }
]

const schoolOptions = [
    { value: '学校1', label: '学校1' },
    { value: '学校2', label: '学校2' },
    { value: '学校3', label: '学校3' },
    { value: '学校4', label: '学校4' }
]

export default class LessonDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    selectSchool(school) {
        console.log(school)
    }

    selectPeriod(period) {
        console.log(period)   
    }

    selectSubject(subject) {
        console.log(subject)
    }

    handlePageClick(page) {
        console.log(page)
    }

    render() {
        const { tableHeader, tableName } = makeTableInfo()
        const tableData = makeTableData()
        return (
            <div className='section' >
                <Header
                    city={'宁德市'}
                    schoolOptions={schoolOptions}
                    periodOptions={periodOptions}
                    subjectOptions={subjectOptions}
                    selectSchool={this.selectSchool.bind(this)}
                    selectPeriod={this.selectPeriod.bind(this)}
                    selectSubject={this.selectSubject.bind(this)}
                />
                <div className='section-title' >课时明细：</div>
                <div style={{ marginTop: 25 }} >
                    <TableView tableHeader={tableHeader} tableName={tableName} downloadkeys={tableHeader[0]} tableData={tableData} cancelTableSort reserveRows />
                </div>
                <Paginator pageCount={5} handlePageClick={this.handlePageClick.bind(this)} />
            </div>
        )
    }
}

function makeTableInfo() {
    let mainHeader = [
        { id: 'area', name: '区县' },
        { id: 'school', name: '学校' },
        { id: 'lesson', name: '课程' },
        { id: 'admin_class', name: '行政班' },
        { id: 'admin_average_count', name: '行政班平均人数' },
        { id: 'teach_class', name: '教学班' },
        { id: 'teach_average_count', name: '教学班平均人数' }
    ];
    _.each(mainHeader, cell => {
        cell.style = { padding: '13px 0 12px 35px', backgroundColor: '#123391', fontSize: 14 };
        cell.columnStyle = _.assign({}, cell.style, { padding: '7px 0 9px 35px', backgroundColor: '#112578', borderTop: `1px solid #112391` })
    });
    const tableName = '基础信息';
    return { tableHeader: [mainHeader], tableName };
}

function makeTableData() {
    let tableData = [];
    for(let i=1; i<=7; i++) {
        let row = {
            area: `区县${i}`,
            school: `学校${i}`,
            lesson: '语文',
            admin_class: _.random(100, 500),
            admin_average_count: _.random(30, 50),
            teach_class: _.random(120000, 130000),
            teach_average_count: _.random(200, 300)
        }
        tableData.push(row)
    }
    tableData.unshift({
        area: `全部`,
        school: '全部',
        lesson: '语文',
        admin_class: 1000,
        admin_average_count: 45,
        teach_class: _.random(120000, 130000),
        teach_average_count: _.random(200, 300)
    })
    return tableData
}