import React from 'react';
import _ from 'lodash';

import Search from '../commonComponents/search';
import ToggleDimension from '../components/basicInfo/toggleDimension';
import TableView from '../commonComponents/table';
import Paginator from '../commonComponents/paginator';
import mockData from '../mockData/basicInfo.json';

const dimensions = [
    { value: '区县', label: '区县', dimension: 'districts' },
    { value: '学校', label: '学校', dimension: 'schools' },
    { value: '教师', label: '教师', dimension: 'teachers' },
    { value: '学生', label: '学生', dimension: 'students' }
];

export default class BasicInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dimension: 'districts',
            currentPage: 0,
            searchText: ''
        }
    }

    handleSearch(text) {
        let keyText = text.trim();
        this.setState({
            searchText: keyText,
            currentPage: 0
        })
    }

    handleChangeDimension(option) {
        this.setState({
            dimension: option.dimension,
            currentPage: 0
        })
    }

    handlePageClick(pageInfo) {
        this.setState({
            currentPage: pageInfo.selected
        })
    }

    render() {
        const city = '宁德市'
        const { tableHeader, tableName } = makeTableInfo(this.state.dimension)
        const { tableData, pageCount } = makeTableData(this.state.dimension, this.state.currentPage, this.state.searchText)
        return (
            <div className='report' >
                <div style={{ textAlign: 'center' }} >
                    <p style={{ fontSize: 24, color: '#fff', margin: 0, padding: '40px 0 25px 0',  }} >{city}基础信息查询</p>
                    <Search
                        useFor='search-basic-info'
                        handleSearch={this.handleSearch.bind(this)}
                        placeholder={'输入区县、学校、教师进行搜索'}
                        width={288}
                    />
                </div>
                <div style={{ width: 1155, margin: '0 auto' }} >
                    <div style={{ marginTop: 44}} >
                        <ToggleDimension handleClick={this.handleChangeDimension.bind(this)} options={dimensions} />
                    </div>
                    <div style={{ marginTop: 25 }} >
                        <TableView
                            tableHeader={tableHeader}
                            tableName={tableName}
                            downloadkeys={tableHeader[0]}
                            tableData={tableData}
                            headRowClassName={'thead-row-deep'}
                            bodyRowClassName={'tbody-row-deep'}
                            reserveRows
                            cancelTableSort
                        />
                    </div>
                </div>
                <Paginator pageCount={pageCount} currentPage={this.state.currentPage} handlePageClick={this.handlePageClick.bind(this)} />
            </div>
        )
    }
}

function makeTableInfo(dimension) {
    let mainHeader = [];
    switch(dimension) {
        case 'schools':
            mainHeader = [
                { id: 'number', name: '序号' },
                { id: 'school', name: '学校' },
                { id: 'district', name: '区县' },
                { id: 'teacherCount', name: '教师人数' },
                { id: 'studentCount', name: '学生人数' },
                { id: 'parentCount', name: '家长人数' },
                { id: 'liankaoCount', name: '联考总次数' },
                { id: 'xiaoneiCount', name: '校内考试总次数' },
                { id: 'paperCount', name: '上传试卷总数' }
            ];
            break;
        case 'teachers':
            mainHeader = [
                { id: 'number', name: '序号' },
                { id: 'name', name: '姓名' },
                { id: 'school', name: '学校' },
                { id: 'role', name: '角色' },
                { id: 'grade', name: '年级' },
                { id: 'class', name: '班级' },
                { id: 'subject', name: '学科' },
                { id: 'contact', name: '电话' },
                { id: 'mail', name: '邮箱' }
            ];
            break;
        case 'students':
            mainHeader = [
                { id: 'number', name: '序号' },
                { id: 'district', name: '区县' },
                { id: 'school', name: '学校' },
                { id: 'name', name: '姓名' },
                { id: 'grade', name: '年级' },
                { id: 'class', name: '班级' },
                { id: 'parent', name: '家长' },
                { id: 'parentContact', name: '家长电话' }
            ];
            break;
        default:
            mainHeader = [
                { id: 'number', name: '序号' },
                { id: 'district', name: '区县' },
                { id: 'schoolCount', name: '学校数' },
                { id: 'teacherCount', name: '教师人数' },
                { id: 'studentCount', name: '学生人数' },
                { id: 'parentCount', name: '家长人数' },
                { id: 'liankaoCount', name: '联考总次数' },
                { id: 'xiaoneiCount', name: '校内考试总次数' },
                { id: 'paperCount', name: '上传试卷总数' }
            ];
    }
    const tableName = '基础信息';
    return { tableHeader: [mainHeader], tableName };
}

function makeTableData(dimension, currentPage, keyText) {
    let data = mockData[dimension];
    if(keyText) {
        if(dimension === 'districts') {
            data = data.filter(row => {
                return row.district.includes(keyText)
            })
        } else if(dimension === 'schools') {
            data = data.filter(row => {
                return row.district.includes(keyText) || row.school.includes(keyText)
            })
        } else {
            data = data.filter(row => {
                return row.name.includes(keyText)
            })
        }
    }
    _.each(data, (row, i) => {
        row.number = i+1;
    });
    let tableData = data.slice(currentPage*8, currentPage*8+8);
    return {
        tableData,
        pageCount: _.ceil(data.length / 8)
    }
}
