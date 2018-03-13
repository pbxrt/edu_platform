import React from 'react';
import _ from 'lodash';

import Header from './header';
import TableView from '../../../commonComponents/table';
import Paginator from '../../../commonComponents/paginator';
import { formatOptions } from '../../../lib/util';

export default class CourseDetail extends React.Component {
    constructor(props) {
        super(props);
        const { data } = this.props;
        this.periodOptions = formatOptions(data.periods);
        this.targetDetailInfo = data.courseDetail.find(item => item.period === this.periodOptions[0].value)
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
        this.targetDetailInfo = this.props.data.courseDetail.find(item => item.period === period.value)
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
            <div className='section'>
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
                <div style={{ margin: '50px 0' }} >
                    <TableView
                        tableHeader={tableHeader}
                        tableName={tableName}
                        downloadkeys={tableHeader[0]}
                        tableData={showData}
                        headRowClassName={'thead-row-deep'}
                        bodyRowClassName={'tbody-row-deep'}
                        reserveRows
                        cancelTableSort
                    />
                </div>
                <Paginator pageCount={pageCount} forcePage={this.state.currentPage} handlePageClick={this.handlePageClick.bind(this)} />
            </div>
        )
    }
}

function makeTableInfo() {
    let mainHeader = [
        { id: 'name', name: '区县' },
        { id: 'school', name: '学校' },
        { id: 'subject', name: '学科' },
        { id: 'course', name: '课程名称' },
        { id: 'selectType', name: '选课类型' }
    ];
    const tableName = '基础信息';
    return { tableHeader: [mainHeader], tableName };
}