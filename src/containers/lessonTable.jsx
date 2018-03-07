import React from 'react';
import _ from 'lodash';

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

    handleClickTable(headerId, row) {
        console.log(headerId, row);
    }

    render() {
        var { location } = this.props;
        console.log(location)
        var tableHeader = makeTableInfo();
        var tableData = makeTableData();
        const city = '宁德市';
        return (
            <div className='report' >
                <Header city={city} />
                <div style={{ width: 1155, margin: '0 auto' }} >
                    <TableView tableHeader={tableHeader} tableData={tableData} handleOnClick={this.handleClickTable.bind(this)} reserveRows cancelTableSort cancelDownload />
                </div>
                <Paginator pageCount={15} handlePageClick={this.handlePageClick.bind(this)} />
            </div>
        )
    }
}

function makeTableInfo() {
    const headerStyle = { padding: '18px 14px 8px 28px', borderStyle: 'solid', borderColor: `${colorsMap.C04} ${colorsMap.B03}`,  backgroundColor: colorsMap['C01'], fontSize: 14, borderWidth: '1px 2px'};
    const columnStyle = Object.assign({}, headerStyle, { padding:'12px 14px 11px 28px', backgroundColor: colorsMap['C02']});
    const mainHeader = [
        { id: 'school', name: '学校' },
        { id: 'school_table', name: '全校课表' },
        { id: 'class_table', name: '班级课表' },
        { id: 'teacher_table', name: '老师课表' },
        { id: 'student_table', name: '学生课表' },
        { id: 'class_room_table', name: '教室课表' }
    ];
    _.each(mainHeader, headerCell => {
        headerCell.style = headerStyle;
        headerCell.columnStyle = columnStyle;
    });
    return [mainHeader];
}

function makeTableData() {
    var tableData = [];
    for(let i=0; i<20; i++) {
        let row = {
            school: `学校${i}`,
            school_table: { value: '查看全校课表', shoolid: '11111' },
            class_table: `查看班级课表（${i}）`,
            teacher_table: `查看老师课表（${i}）`,
            student_table: `查看学生课表（${i}）`,
            class_room_table: `查看教室课表（${i}）`
        };
        tableData.push(row);
    }
    return tableData;
}