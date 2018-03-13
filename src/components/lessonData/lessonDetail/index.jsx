import React from 'react';
import _ from 'lodash';

import TableView from '../../../commonComponents/tableView';
import Paginator from '../../../commonComponents/paginator';
import { formatOptions } from '../../../lib/util';
import Header from './header';

export default class LessonDetail extends React.Component {
    constructor(props) {
        super(props);
        const { statis } = this.props;
        this.periodOptions = formatOptions(statis.periods);
        this.targetDetailInfo = statis.lessonDetail.find(item => item.period === this.periodOptions[0].value)
        const schoolOptions = formatOptions(this.targetDetailInfo.schools);
        const subjectOptions = formatOptions(this.targetDetailInfo.subjects)
        this.state = {
            periodOptions: this.periodOptions,
            schoolOptions,
            subjectOptions,
            tableData: this.targetDetailInfo.items,
            currentPage: 0
        }
    }

    selectSchool(school) {
        if(school.value === '全部') {
            this.setState({
                tableData: this.targetDetailInfo.items 
            })
        } else {
            this.setState({
                tableData: this.targetDetailInfo.items.filter(row => row.school === school.value)
            })
        }
    }

    selectPeriod(period) {
        this.targetDetailInfo = this.props.statis.lessonDetail.find(item => item.period === period.value)
        const schoolOptions = formatOptions(this.targetDetailInfo.schools);
        const subjectOptions = formatOptions(this.targetDetailInfo.subjects)
        this.setState({
            schoolOptions,
            subjectOptions,
            tableData: this.targetDetailInfo.items,
            currentPage: 0
        })
    }

    selectSubject(subject) {
        if(subject.value === '全部') {
            this.setState({
                tableData: this.targetDetailInfo.items
            })
        } else {
            this.setState({
                tableData: this.targetDetailInfo.items.filter(row => row.subject === subject.value)
            })
        }
    }

    handlePageClick(pageInfo) {
        this.setState({
            currentPage: pageInfo.selected
        })
    }

    handleSearch(text) {
        if(text) {
            this.setState({
                tableData: this.state.tableData.filter(row => (row.school===text) || (row.district===text))
            })
        } else {
            this.setState({
                tableData: this.targetDetailInfo.items,
                currentPage: 0
            })
        }
    }

    render() {
        const { tableHeader, tableName } = makeTableInfo()
        const tableData = this.state.tableData;
        const pageCount = _.chain(tableData).size().divide(8).value()
        const showData = tableData.slice(this.state.currentPage*8, this.state.currentPage*8 + 8)
        return (
            <div className='section' >
                <Header
                    city={'宁德市'}
                    schoolOptions={this.state.schoolOptions}
                    periodOptions={this.state.periodOptions}
                    subjectOptions={this.state.subjectOptions}
                    selectSchool={this.selectSchool.bind(this)}
                    selectPeriod={this.selectPeriod.bind(this)}
                    selectSubject={this.selectSubject.bind(this)}
                    handleSearch={this.handleSearch.bind(this)}
                />
                <div className='section-title' >课时明细：</div>
                <div style={{ marginTop: 25 }} >
                    <TableView tableHeader={tableHeader} tableName={tableName} downloadkeys={tableHeader[0]} tableData={showData} cancelTableSort reserveRows />
                </div>
                <Paginator pageCount={pageCount} forcePage={this.state.currentPage} handlePageClick={this.handlePageClick.bind(this)} />
            </div>
        )
    }
}

function makeTableInfo() {
    let mainHeader = [
        { id: 'district', name: '区县' },
        { id: 'school', name: '学校' },
        { id: 'teacher', name: '老师' },
        { id: 'grade', name: '年级' },
        { id: 'subject', name: '学科' },
        { id: 'teachClass', name: '教学班' },
        { id: 'weekHours', name: '周课时' }
    ];
    _.each(mainHeader, cell => {
        cell.style = { padding: '13px 0 12px 35px', backgroundColor: '#123391', fontSize: 14 };
        cell.columnStyle = _.assign({}, cell.style, { padding: '7px 0 9px 35px', backgroundColor: '#112578', borderTop: `1px solid #112391` })
    });
    const tableName = '课时详细数据';
    return { tableHeader: [mainHeader], tableName };
}