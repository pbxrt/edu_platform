import React from 'react';
import _ from 'lodash';

import TableView from '../../commonComponents/tableView';
import { downloadData } from '../../lib/util';
import { colorsMap } from '../../shared/constants';

export default class SubjectGrpDetail extends React.Component {
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
        const mockData = makeData();
        let { tableHeader, tableName, downloadkeys } = makeTableInfo(mockData);
        let tableData = makeTableData(mockData);
        return (
            <div className='section' style={{backgroundColor: colorsMap['B02']}} >
                <div className='section-title'>各校选科组合数对比：</div>
                <div style={{ paddingTop: 30}} >
                    <TableView tableStyle={{ borderStyle: 'solid', borderWidth: '10px 0 10px 0', borderColor: `${colorsMap['B08']} transparent #113291 transparent`}} tableHeader={tableHeader} tableName={tableName} downloadkeys={downloadkeys} tableData={tableData} reserveRows cancelTableSort />
                </div>
            </div>
        )
    }
}

function makeTableInfo({ tpkeys, tgkeys, statis }) {
    let mainHeader = [];
    let subHeader = [];
    let downloadkeys = [];
    _.each(tgkeys, (groupName, groupKey) => {
        const mainCell = { colSpan: 4, name: groupName };
        const subCells = [
            { id: `${groupKey}_count`, name: '人数' },
            { id: `${groupKey}_rate`, name: '比例' },
            { id: `${groupKey}_male`, name: '男生人数' },
            { id: `${groupKey}_female`, name: '女生人数'  }
        ];
        const tempDownloadkeys = _.map(subCells, cell => {
            return _.assign({}, cell, { name: `${groupName}${cell.name}`})
        });
        if(groupKey === 'all') {
            mainHeader.unshift(mainCell);
            subHeader.unshift(...subCells);
            downloadkeys.unshift(...tempDownloadkeys)
        } else {
            mainHeader.push(mainCell);
            subHeader.push(...subCells);
            downloadkeys.push(...tempDownloadkeys);
        }
    });
    mainHeader.unshift({name: ''});
    subHeader.unshift({ id: 'subject_grp', name: '选科组合' });
    _.each(mainHeader, cell => {
        cell.style = { paddingBottom: 5, textAlign: 'center', backgroundColor: colorsMap['B08']}
        if(cell.name) {
            _.assign(cell.style, { borderLeft: '1px solid #1344B2' })
        }
    });
    _.each(subHeader, cell => {
        cell.style = { padding: '0 0 10px 20px', backgroundColor: colorsMap['B08']};
        cell.columnStyle = { padding: '10px 0 10px 20px', backgroundColor: '#113291', borderTop: `1px solid #1344B2`};
        if(cell.name === '人数') {
            _.assign(cell.columnStyle, { borderLeft: `1px solid #1344B2`});
            _.assign(cell.style, { borderLeft: `1px solid #1344B2`})
        }
    })
    const tableName = '选科组合明细';
    return { tableHeader: [mainHeader, subHeader], tableName, downloadkeys };
}

function makeTableData({ tpkeys, tgkeys, statis }) {
    let tableData = [];
    _.each(tpkeys, (pname, pkey) => {
        let row = { subject_grp: pname };
        _.each(tgkeys, (groupName, groupKey) => {
            row[`${groupKey}_count`] = statis[pkey][groupKey].count;
            row[`${groupKey}_rate`] = statis[pkey][groupKey].rate;
            row[`${groupKey}_male`] = statis[pkey][groupKey].male;
            row[`${groupKey}_female`] = statis[pkey][groupKey].female;
        });
        tableData.push(row);
    });
    return tableData;
}

function makeData() {
    const tpkeys = {
        shz: '生化政',
        shd: '生化地',
        sld: '生历地',
        slz: '生历政',
        whl: '物化历',
        slj: '生历技',
        swd: '生物地',
        whj: '物化技',
        whs: '物化生'
    };
    const tgkeys = {
        all: '全体',
        s1: '学校1',
        s2: '学校2'
    };
    const statis = {
        shz: {
            all: {
                count: 500,
                rate: 56,
                male: 260,
                female: 240
            },
            s1: {
                count: 500,
                rate: 56,
                male: 260,
                female: 240
            },
            s2: {
                count: 500,
                rate: 56,
                male: 260,
                female: 240
            }
        },
        shd: {
            all: {
                count: 500,
                rate: 56,
                male: 260,
                female: 240
            },
            s1: {
                count: 500,
                rate: 56,
                male: 260,
                female: 240
            },
            s2: {
                count: 500,
                rate: 56,
                male: 260,
                female: 240
            }
        },
        sld: {
            all: {
                count: 500,
                rate: 56,
                male: 260,
                female: 240
            },
            s1: {
                count: 500,
                rate: 56,
                male: 260,
                female: 240
            },
            s2: {
                count: 500,
                rate: 56,
                male: 260,
                female: 240
            }
        },
        slz: {
            all: {
                count: 500,
                rate: 56,
                male: 260,
                female: 240
            },
            s1: {
                count: 500,
                rate: 56,
                male: 260,
                female: 240
            },
            s2: {
                count: 500,
                rate: 56,
                male: 260,
                female: 240
            }
        },
        whl: {
            all: {
                count: 500,
                rate: 56,
                male: 260,
                female: 240
            },
            s1: {
                count: 500,
                rate: 56,
                male: 260,
                female: 240
            },
            s2: {
                count: 500,
                rate: 56,
                male: 260,
                female: 240
            }
        },
        slj: {
            all: {
                count: 500,
                rate: 56,
                male: 260,
                female: 240
            },
            s1: {
                count: 500,
                rate: 56,
                male: 260,
                female: 240
            },
            s2: {
                count: 500,
                rate: 56,
                male: 260,
                female: 240
            }
        },
        swd: {
            all: {
                count: 500,
                rate: 56,
                male: 260,
                female: 240
            },
            s1: {
                count: 500,
                rate: 56,
                male: 260,
                female: 240
            },
            s2: {
                count: 500,
                rate: 56,
                male: 260,
                female: 240
            }
        },
        whj: {
            all: {
                count: 500,
                rate: 56,
                male: 260,
                female: 240
            },
            s1: {
                count: 500,
                rate: 56,
                male: 260,
                female: 240
            },
            s2: {
                count: 500,
                rate: 56,
                male: 260,
                female: 240
            }
        },
        whs: {
            all: {
                count: 500,
                rate: 56,
                male: 260,
                female: 240
            },
            s1: {
                count: 500,
                rate: 56,
                male: 260,
                female: 240
            },
            s2: {
                count: 500,
                rate: 56,
                male: 260,
                female: 240
            }
        }
    };
    return { tpkeys, tgkeys, statis };
}