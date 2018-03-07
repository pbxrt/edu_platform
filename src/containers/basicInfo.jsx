import React from 'react';
import _ from 'lodash';

import Search from '../commonComponents/search';
import ToggleDimension from '../components/basicInfo/toggleDimension';
import TableView from '../commonComponents/tableView';
import Paginator from '../commonComponents/paginator'

const dimensions = [
    { value: '区县', label: '区县' },
    { value: '学校', label: '学校' },
    { value: '教师', label: '教师' },
    { value: '学生', label: '学生' }
];

export default class BasicInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleSearch(text) {
        console.log('search text is ', text)
    }

    handleChangeDimension(option) {
        console.log(option)
    }

    handlePageClick(page) {
        console.log(page)
    }

    render() {
        const city = '宁德市'
        const { tableHeader, tableName } = makeTableInfo()
        const tableData = makeTableData()
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
                        <TableView tableHeader={tableHeader} tableName={tableName} downloadkeys={tableHeader[0]} tableData={tableData} cancelTableSort reserveRows />
                    </div>
                </div>
                <Paginator pageCount={15} handlePageClick={this.handlePageClick.bind(this)} />
            </div>
        )
    }
}

function makeTableInfo() {
    let mainHeader = [
        { id: 'number', name: '序号' },
        { id: 'area', name: '区县' },
        { id: 'school_count', name: '学校数' },
        { id: 'teacher_count', name: '教师数' },
        { id: 'student_count', name: '学生数' },
        { id: 'parent_count', name: '家长人数' },
        { id: 'liankao_count', name: '联考总次数' },
        { id: 'xiaonei_count', name: '校内考试总次数' },
        { id: 'paper_count', name: '上传试卷总数' }
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
    for(let i=1; i<=8; i++) {
        let row = {
            number: i,
            area: `区县${i}`,
            school_count: _.random(80, 100),
            teacher_count: _.random(200, 400),
            student_count: _.random(2000, 4000),
            parent_count: _.random(1000, 2000),
            liankao_count: _.random(80, 150),
            xiaonei_count: _.random(300, 500),
            paper_count: _.random(100000, 120000)
        }
        tableData.push(row)
    }
    return tableData
}