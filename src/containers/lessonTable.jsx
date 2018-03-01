import React from 'react';

import TableView from '../commonComponents/tableView';
import Header from '../components/lessonTable/header';
import Paginator from '../commonComponents/paginator';
import { colorsMap } from '../shared/constants';

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

    render() {
        var { location } = this.props;
        var tableHeader = makeTableInfo();
        var tableData = makeTableData();
        const city = '宁德市';
        return (
            <div className='report' >
                <Header city={city} />
                <div style={{ width: 1155, margin: '0 auto' }} >
                    <TableView tableHeader={tableHeader} tableData={tableData} reserveRows cancelTableSort cancelDownload />
                </div>
                <div style={{ width: 400, margin: '0 auto' }} >
                    <Paginator pageCount={15} handlePageClick={this.handlePageClick.bind(this)} />
                </div>
            </div>
        )
    }
}

function makeTableInfo() {
    const mainHeader = [
        { id: 'school', name: 'School' },
        { id: 'school_table', name: 'School Table' },
        { id: 'class_table', name: 'Class Table' },
        { id: 'teacher_table', name: 'Teacher Table' },
        { id: 'student_table', name: 'Student Table' },
        { id: 'class_room_table', name: 'Class Room Table' }
    ];
    return [mainHeader];
}

function makeTableData() {
    var tableData = [];
    for(let i=0; i<20; i++) {
        let row = {
            school: `school${i}`,
            school_table: `school_table${i}`,
            class_table: `class_table${i}`,
            teacher_table: `teacher_table${i}`,
            student_table: `student_table${i}`,
            class_room_table: `class_room_table${i}`
        };
        tableData.push(row);
    }
    return tableData;
}