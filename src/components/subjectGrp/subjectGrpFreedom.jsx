import React from 'react';
import _ from 'lodash';

import { colorsMap } from '../../shared/constants';
import TableView from '../../commonComponents/table';
import { downloadData } from '../../lib/util';
import r1 from '../../images/r1.png';
import r2 from '../../images/r2.png';
import r3 from '../../images/r3.png';
import download_icon from '../../images/download.png';

const rankImageMap = { r1, r2, r3 };

export default class SubjectGrpFreedom extends React.Component {
    handleDownload(tableHeader, tableData, tableName) {
        let cols = [], keys = [], rows = [];
        _.each(tableHeader[0], headerCell => {
            if(headerCell.id !== 'badge') {
                if(headerCell.id === 'subjectGrpCount') {
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
        const { targetData } = this.props;
        const { rank } = targetData.schoolCompare;
        var { tableHeader, tableName } = makeTableInfo();
        const tableData = makeTableData(rank)
        return (
            <div className='section' >
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
                        <TableView
                            tableHeader={tableHeader}
                            tableName={tableName}
                            tableData={tableData.slice(0, 8)}
                            headRowClassName={'thead-row-school-rank-compare'}
                            bodyRowClassName={'tbody-row-school-rank-compare'}
                            reserveRows
                            cancelTableSort
                            cancelDownload
                        />
                    </div>
                    <div style={{ width: 1, backgroundColor: colorsMap['B07'] }} ></div>
                    <div style={{ width: 537 }} >
                        <TableView
                            tableHeader={tableHeader}
                            tableName={tableName}
                            tableData={tableData.slice(8)}
                            headRowClassName={'thead-row-school-rank-compare'}
                            bodyRowClassName={'tbody-row-school-rank-compare'}
                            reserveRows
                            cancelTableSort
                            cancelDownload
                        />
                    </div>
                </div>
            </div>
        )
    }
}

function getColumnStyle(id, rowData, tableData) {
    return (rowData.rank <= 3) ? { color: colorsMap[`R0${rowData.rank}`]} : {}
}

function makeTableInfo() {
    var mainHeader = [
        { id: 'badge', name: ''},
        { id: 'rank', name: '排名' },
        { id: 'name', name: '学校' },
        { id: 'subjectGrpCount', name: '选科组合数' }
    ];
    _.each(mainHeader, headerCell => {
        if(headerCell.id !== 'badge') {
            headerCell.columnStyle = getColumnStyle;
        }
    })
    var tableName = '各校选科组合数对比';
    return { tableHeader: [mainHeader], tableName };
}

function makeTableData(rank) {
    var tableData = [];
    _.each(rank, (row, i) => {
        let tempRow = {
            rank: row.rank,
            name: row.name,
            subjectGrpCount: (
                <div style={{ display: 'flex', alignItems: 'center' }} >
                    <span style={{ marginRight: 12}} >{row.subjectGrpCount}</span>
                    <span style={{ width: (row.subjectGrpCount)*4, height: 8, borderRadius: 4, backgroundColor: (row.rank) > 3 ? '#475e9f' : colorsMap[`R0${row.rank}`], transition: 'width 0.1s linear' }} ></span>
                </div>
            ),
            countValue: row.subjectGrpCount
        };
        if(tempRow.rank <= 3) {
            tempRow.badge = <img style={{ width: 21, height: 27 }} src={rankImageMap[`r${tempRow.rank}`]} alt={'badge'} />;
        }
        tableData.push(tempRow);
    })
    return tableData;
}