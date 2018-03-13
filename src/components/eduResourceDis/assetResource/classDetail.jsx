import React from 'react';
import _ from 'lodash';

import TableView from '../../../commonComponents/table';
import Paginator from '../../../commonComponents/paginator';

export default class SchoolDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 66,
            currentPage: 0,
            pageSize: 8
        }
    }

    componentWillReceiveProps(nextProps) {
        this.refs.input.value = 66;
        this.setState({
            value: 66,
            currentPage: 0
        });
    }

    handleChange(event) {
        this.setState({ value: event.nativeEvent.target.value })
    }

    handlePageClick(pageInfo) {
        this.setState({
            currentPage: pageInfo.selected
        })
    }

    render() {
        const { tableHeader, tableName } = makeTableInfo(this.state.value);
        const tableData = this.props.targetData.assetDisDetail.classes;
        const showData = tableData.slice(this.state.currentPage * this.state.pageSize, this.state.currentPage * this.state.pageSize + this.state.pageSize)
        const pageCount = _.chain(tableData).size().divide(this.state.pageSize).ceil().value();
        const overSchools = makeSummaryInfo(tableData, this.state.value)
        return (
            <div className='section'>
                <div>
                    <span className='section-title'>学校班级学生分布明细：</span>
                    <div style={{ display: 'inline-block', paddingLeft: 500 }} >
                        超过
                        <input type='text'
                            ref='input'
                            style={{
                                margin: '0 10px',
                                textAlign: 'center',
                                width: 80,
                                height: 30,
                                border: '1px solid #888db3',
                                borderRadius: 2,
                                backgroundColor: 'transparent'
                            }}
                            defaultValue={this.state.value}
                            onBlur={this.handleChange.bind(this)}
                        />
                        人班级提醒
                    </div>
                </div>
                <div style={{ paddingTop: 25 }} >
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
                <p style={{ margin: '20px 0'}} >
                    以上标红的班级需注意，2018年教育部部长在全国教育工作会议上提到，要消除66人以上的超大班额。
                    <span style={{ color: '#d5368c' }} >{overSchools}</span>
                    需重点关注
                </p>
                <Paginator pageCount={pageCount} currentPage={this.state.currentPage} handlePageClick={this.handlePageClick.bind(this)} />
            </div>
        )
    }
}

function makeTableInfo(value) {
    let mainHeader = [
        { id: 'district', name: '区县' },
        { id: 'school', name: '学校' },
        { id: 'teachClass', name: '教学班', columnStyle: getColumnStyle.bind(null, value) },
        { id: 'studentCount', name: '学生人数', columnStyle: getColumnStyle.bind(null, value) },
    ];
    const tableName = '学校班级学生分布明细';
    return { tableHeader: [mainHeader], tableName };
}

function getColumnStyle(value, id, rowData, tableData) {
    value = parseInt(value, 10) || 0;
    if(rowData['studentCount'] >= value) {
        return { color: '#d5368c' }
    }
    return {}
}

function makeSummaryInfo(tableData, value) {
    value = parseInt(value, 10) || 0;
    return _.chain(tableData).filter(row => row.studentCount >= value).map('school').join('、').value();
}