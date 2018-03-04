import React from 'react';
import _ from 'lodash';

import { colorsMap } from '../../shared/constants';
import TableView from '../../commonComponents/tableView';
import { downloadData } from '../../lib/util';
import r1 from '../../images/r1.png';
import r2 from '../../images/r2.png';
import r3 from '../../images/r3.png';
import download_icon from '../../images/download.png';

const rankImageMap = { r1, r2, r3 };

export default class SubjectGrpFreedom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleDownload(tableHeader, tableData, tableName) {
        let cols = [], keys = [], rows = [];
        _.each(tableHeader[0], headerCell => {
            if(headerCell.id !== 'badge') {
                if(headerCell.id === 'count') {
                    keys.push('countValue')
                } else {
                    keys.push(headerCell.id)
                }
                cols.push(headerCell.name);
            }
        });
        _.each(tableData, row => {
            let temp = [];
            _.each(keys, key => {
                temp.push(row[key])
            });
            rows.push(temp);
        });
        downloadData(cols, rows, tableName )
    }

    render() {
        var { tableHeader, tableName } = makeTableInfo();
        var  tableData = makeTableData();
        return (
            <div className='section' >
                <div style={{ width: 1320, paddingLeft: 165, margin: '0 auto' }} >
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 30}} >
                        <div>
                            <span className='section-title'>各校选科组合数对比：</span>
                            <span className='section-desc'>“7选3”下35种组合，“6选3”下20种组合，学校组合数越多，学生选科自由度越高</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={this.handleDownload.bind(this, tableHeader, tableData, tableName)}>
                            <img style={{ width: 19, height: 18 }} src={download_icon} alt={'download_icon'} />
                            <span style={{ marginLeft: 10}} >下载表格</span>
                        </div>
                    </div>
                    <div style={{ padding: '20px 40px', backgroundColor: colorsMap['B06'], display: 'flex' }} >
                        <div style={{ width: 537 }} >
                            <TableView tableHeader={tableHeader} tableName={tableName} tableData={tableData.slice(0, 8)} reserveRows cancelTableSort cancelDownload />
                        </div>
                        <div style={{ width: 1, backgroundColor: colorsMap['B07'] }} ></div>
                        <div style={{ width: 537 }} >
                            <TableView tableHeader={tableHeader} tableName={tableName} tableData={tableData.slice(8)} reserveRows cancelTableSort cancelDownload />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function getColumnStyle(id, rowData, tableData) {
    var normalStyle = { padding: '10px 0 10px 10px', fontSize: 14, fontWeight: 400, color: colorsMap['RN'] };
    if(rowData.rank <= 3) {
        return _.assign({}, normalStyle, { color: colorsMap[`R0${rowData.rank}`]})
    }
    return normalStyle;
}

function makeTableInfo() {
    const cellStyle = { padding: '10px 0 10px 10px', fontSize: 14, fontWeight: 400 };
    var mainHeader = [
        { id: 'badge', name: '', style: {width: 55}},
        { id: 'rank', name: '排名' },
        { id: 'school', name: '学校' },
        { id: 'count', name: '选科组合数' }
    ];
    _.each(mainHeader, headerCell => {
        if(headerCell.id !== 'badge') {
            headerCell.style = cellStyle;
            headerCell.columnStyle = getColumnStyle;
        }
    })
    var tableName = '各校选科组合数对比';
    return { tableHeader: [mainHeader], tableName };
}

function makeTableData() {
    var tableData = [];
    for(var i=0; i<16; i++) {
        let row = {
            rank: i+1,
            school: `学校${i+1}`,
            count: (
                <div style={{ display: 'flex', alignItems: 'center' }} >
                    <span style={{ marginRight: 12}} >{20-i}</span>
                    <span style={{ width: (20-i)*5, height: 8, borderRadius: 4, backgroundColor: (i+1) > 3 ? colorsMap[`RN`] : colorsMap[`R0${i+1}`] }} ></span>
                </div>
            ),
            countValue: i+1
        };
        if(row.rank <= 3) {
            row.badge = <img style={{ width: 21, height: 27 }} src={rankImageMap[`r${row.rank}`]} alt={'badge'} />;
        }
        tableData.push(row);
    }
    return tableData;
}