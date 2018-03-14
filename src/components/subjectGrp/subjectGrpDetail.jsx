import React from 'react';
import _ from 'lodash';

import TableView from '../../commonComponents/table';
import { colorsMap } from '../../shared/constants';

export default class SubjectGrpDetail extends React.Component {
    render() {
        let { tableHeader, tableName, downloadkeys } = makeTableInfo();
        let tableData = this.props.targetData.schoolCompare.count
        return (
            <div className='section' style={{backgroundColor: colorsMap['B02']}} >
                <div className='section-title'>各校选科组合数对比：</div>
                <div style={{ paddingTop: 30}} >
                    <TableView
                        tableStyle={{ borderStyle: 'solid', borderWidth: '10px 0 10px 0', borderColor: `${colorsMap['B08']} transparent #113291 transparent`}}
                        tableHeader={tableHeader}
                        tableName={tableName}
                        downloadkeys={downloadkeys}
                        tableData={tableData}
                        headRowClassName={'thead-row-light'}
                        bodyRowClassName={'tbody-row-light'}
                        reserveRows
                        cancelTableSort
                    />
                </div>
            </div>
        )
    }
}

function makeTableInfo() {
    let tgkeys = [{id: 'total', name: '全体'}, {id: 's1', name: '学校1'}, {id: 's2', name: '学校2'}];
    let mainHeader = [{ id: 'subGrp', name: '选科组合', rowSpan: 2 }];
    let downloadkeys = [{ id: 'subGrp', name: '选科组合'}];
    let subHeader = [];
    _.each(tgkeys, (item) => {
        mainHeader.push({ name: item.name, colSpan: 4 })
        subHeader.push(
            { id: `${item.id}Count`, name: '人数' },
            { id: `${item.id}Rate`, name: '比例' },
            { id: `${item.id}Male`, name: '男生人数' },
            { id: `${item.id}Female`, name: '女生人数' }
        );
        downloadkeys.push(
            { id: `${item.id}Count`, name: item.name + '人数' },
            { id: `${item.id}Rate`, name: item.name + '比例' },
            { id: `${item.id}Male`, name: item.name + '男生人数' },
            { id: `${item.id}Female`, name: item.name + '女生人数' }
        );
    })
    const tableName = '各校选科组合数对比分析';
    return { tableHeader: [ mainHeader, subHeader], downloadkeys, tableName }
}