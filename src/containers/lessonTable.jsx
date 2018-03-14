import React from 'react';

import TableView from '../commonComponents/table';
import Header from '../components/lessonTable/header';
import Paginator from '../commonComponents/paginator';

export default class LessonTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    handlePageClick(page) {
        console.log(page)
    }

    handleClickTable(headerId, row) {
        console.log(headerId, row);
    }

    render() {
        var tableHeader = makeTableInfo();
        var tableData = makeTableData();
        const city = '宁德市';
        return (
            <div className='report' >
                <Header city={city} />
                <div style={{ width: 1155, margin: '0 auto' }} >
                    <TableView
                        tableHeader={tableHeader}
                        tableData={tableData}
                        handleOnClick={this.handleClickTable.bind(this)}
                        headRowClassName={'thead-row-lesson-table'}
                        bodyRowClassName={'tbody-row-lesson-table'}
                        reserveRows
                        cancelTableSort
                        cancelDownload
                    />
                </div>
                <Paginator pageCount={15} handlePageClick={this.handlePageClick.bind(this)} />
            </div>
        )
    }
}

function makeTableInfo() {
    const mainHeader = [
        { id: 'school', name: '学校' },
        { id: 'school_table', name: '全校课表' },
        { id: 'teacher_table', name: '老师课表' },
        { id: 'student_table', name: '学生课表' },
        { id: 'class_room_table', name: '教室课表' }
    ];
    return [mainHeader];
}

function makeTableData() {
    var tableData = [];
    for(let i=0; i<20; i++) {
        let row = {
            school: `学校${i}`,
            school_table: { value: '查看全校课表', shoolid: '11111' },
            teacher_table: `查看老师课表（${i}）`,
            student_table: `查看学生课表（${i}）`,
            class_room_table: `查看教室课表（${i}）`
        };
        tableData.push(row);
    }
    return tableData;
}