import React from 'react';
import _ from 'lodash';

import TableView from '../commonComponents/table';
import Header from '../components/lessonTable/header';
import Paginator from '../commonComponents/paginator';

import { formatOptions } from '../lib/util';
import mockData from '../mockData/lessonTable.json';

export default class LessonTable extends React.Component {
    constructor(props) {
        super(props);
        const { info } = mockData;
        this.periodOptions = formatOptions(info.periods);
        this.city = info.city;
        const currentPeriod = this.periodOptions[0];
        this.tableData = mockData.tables.find(item => item.period === currentPeriod.label).items
        this.state = {
            value: '',
            currentPeriod,
            currentPage: 0
        }
    }

    handlePageClick(pageInfo) {
        this.setState({ currentPage: pageInfo.selected })
    }

    handleClickTable(headerId, row) {
        console.log(headerId, row);
    }

    handleSearch(keyText) {
        if(keyText) {
            this.tableData = this.tableData.filter(row => row.school.includes(keyText))    
        } else {
            this.tableData = mockData.tables.find(item => item.period === this.state.currentPeriod.label).items
        }
        this.setState({ currentPage: 0 })
    }

    selectPeriod(period) {
        this.tableData = mockData.tables.find(item => item.period === period.label).items
        this.setState({
            currentPage: 0,
            currentPeriod: period
        })
    }

    render() {
        var tableHeader = makeTableInfo();
        const pageCount = _.chain(this.tableData).size().divide(8).ceil().value()
        const showData = this.tableData.slice(this.state.currentPage * 8, this.state.currentPage * 8 + 8)
        return (
            <div className='report' >
                <Header
                    city={this.city}
                    periodOptions={this.periodOptions}
                    handleSearch={this.handleSearch.bind(this)}
                    selectPeriod={this.selectPeriod.bind(this)}
                />
                <div style={{ width: 1155, margin: '0 auto' }} >
                    <TableView
                        tableHeader={tableHeader}
                        tableData={showData}
                        handleOnClick={this.handleClickTable.bind(this)}
                        headRowClassName={'thead-row-lesson-table'}
                        bodyRowClassName={'tbody-row-lesson-table'}
                        reserveRows
                        cancelTableSort
                        cancelDownload
                    />
                </div>
                <Paginator pageCount={pageCount} currentPage={this.state.currentPage} handlePageClick={this.handlePageClick.bind(this)} />
            </div>
        )
    }
}

function makeTableInfo() {
    const mainHeader = [
        { id: 'school', name: '学校' },
        { id: 'gradeTable', name: '年级课表' },
        { id: 'teacherTable', name: '教师课表' },
        { id: 'studentTable', name: '学生课表' },
        { id: 'classroomTable', name: '教室课表' }
    ];
    return [mainHeader];
}