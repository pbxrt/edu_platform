import React from 'react';
import _ from 'lodash';

import { colorsMap } from '../../shared/constants';
import TableView from '../../commonComponents/tableView';

export default class DistrictCompare extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { tableHeader, tableName } = makeTableInfo();
        const tableData = makeTableData();
        return (
            <div style={{backgroundColor: colorsMap['B02']}} >
                <div style={{width: 1155, margin: '0 auto', padding: '40px 0 60px 0'}} >
                    <div className='section-title'>区县师生对比明细：</div>
                    <div style={{ marginTop: 25 }} >
                        <TableView tableHeader={tableHeader} tableName={tableName} downloadkeys={tableHeader[0]} tableData={tableData} cancelTableSort reserveRows />
                    </div>
                </div>
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
        cell.style = { padding: '13px 0 12px 35px', backgroundColor: '#123ca4', fontSize: 14 };
        cell.columnStyle = _.assign({}, cell.style, { padding: '7px 0 9px 35px', backgroundColor: '#113291', borderTop: `1px solid #1344b2` })
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