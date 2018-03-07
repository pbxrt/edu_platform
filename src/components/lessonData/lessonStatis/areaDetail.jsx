import React from 'react';
import _ from 'lodash';

import Toggle from '../../../commonComponents/binary-toggle';
import TableView from '../../../commonComponents/tableView';

export default class AreaDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }    
    }

    render() {
        const options = [ { value: '周授课时对比', label: '周授课时对比' }, { value: '授课班级对比', label: '授课班级对比' }];
        const tableHeader = makeTableHeader();
        const tableData = makeTableData();
        return (
            <div className='section'>
                <header style={{ display: 'flex', alignItems: 'center' }} >
                    <span style={{ flex: 1 }} >县详细数据（高一）：</span>
                    <div style={{ flex: 1, textAlign: 'center' }} >
                        <Toggle options={options} />
                    </div>
                    <div style={{ flex: 1 }} ></div>
                </header>
                <div style={{ marginTop: 30 }} >
                    <TableView tableHeader={tableHeader} tableData={tableData} reserveRows cancelTableSort />
                </div>
            </div>
        )
    }
    
}

function makeTableHeader() {
    const subjects = ['语文', '数学', '英语']
    let mainHeader = [
        { id: 'area', name: '区县', rowSpan: 2 }
    ];
    let subHeader = [];
    _.each(subjects, (subject, index) => {
        mainHeader.push({ name: subject, colSpan: 3 });
        subHeader.push(
            { id: `${subject}_mean`, name: '平均班级数' },
            { id: `${subject}_max`, name: '最大班级数' },
            { id: `${subject}_min`, name: '最小班级数' }
        );
    });
    _.each(mainHeader, cell => {
        cell.style = { padding: '10px 0 9px 35px', backgroundColor: '#123391', textAlign: 'center' };
        if(cell.id) {
            cell.columnStyle = { padding: '9px 0 9px 35px', backgroundColor: '#112578', borderTop: '1px solid #123391'}    
        }    
    });
    _.each(subHeader, cell => {
        if(cell.id) {
            cell.style = { padding: '10px 0 9px 35px', backgroundColor: '#123391' };
            cell.columnStyle = { padding: '9px 0 9px 35px', backgroundColor: '#112578', borderTop: '1px solid #123391'}
        }
    });
    return [mainHeader, subHeader];
}

function makeTableData() {
    let tableData = [];
    const subjects = ['语文', '数学', '英语'];
    for(let i=1; i<=7; i++) {
        let row = { area: `区县${i}`}
        _.each(subjects, (subject, index) => {
            row[`${subject}_mean`] = _.random(20, 30);
            row[`${subject}_max`] = _.random(20, 30);
            row[`${subject}_min`] = _.random(20, 30);
        });
        tableData.push(row)
    }
    return tableData;
}