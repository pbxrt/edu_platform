import React from 'react';
import _ from 'lodash';

import Toggle from '../../../commonComponents/binary-toggle';
import TableView from '../../../commonComponents/table';

export default class AreaDetail extends React.Component {
    constructor(props) {
        super(props);
        this.dimensions = [ { value: '周授课时对比', label: '周授课时对比' }, { value: '授课班级对比', label: '授课班级对比' }];
        this.state = {
            currentDimension: this.dimensions[0]
        };
    }

    handleToggle(option) {
        this.setState({ currentDimension: option })
    }

    render() {
        const { districts, grade } = this.props.data;
        const { tableHeader, downloadkeys, tableName } = makeTableHeader(districts.subjects);
        const tableData = makeTableData(districts, this.state.currentDimension);
        return (
            <div className='section'>
                <header style={{ display: 'flex', alignItems: 'center' }} >
                    <span style={{ flex: 1 }} >县详细数据（{grade}）：</span>
                    <div style={{ flex: 1, textAlign: 'center' }} >
                        <Toggle
                            options={this.dimensions}
                            handleToggle={this.handleToggle.bind(this)}
                        />
                    </div>
                    <div style={{ flex: 1 }} ></div>
                </header>
                <div style={{ marginTop: 30 }} >
                    <TableView
                        tableHeader={tableHeader}
                        tableName={tableName}
                        downloadkeys={downloadkeys}
                        tableData={tableData}
                        headRowClassName={'thead-row-deep'}
                        bodyRowClassName={'tbody-row-deep'}
                        reserveRows
                        cancelTableSort
                    />
                </div>
            </div>
        )
    }
    
}

function makeTableHeader(subjects) {
    let mainHeader = [{ id: 'name', name: '区县', rowSpan: 2 }];
    let subHeader = [];
    let downloadkeys = [{ id: 'name', name: '区县'}];
    _.each(subjects, (subject, index) => {
        mainHeader.push({ name: subject.name, colSpan: 3 });
        subHeader.push(
            { id: `${subject.id}_mean`, name: '平均班级数' },
            { id: `${subject.id}_max`, name: '最大班级数' },
            { id: `${subject.id}_min`, name: '最小班级数' }
        );
        downloadkeys.push(
            { id: `${subject.id}_mean`, name: `${subject.name}平均班级数` },
            { id: `${subject.id}_max`, name: `${subject.name}最大班级数` },
            { id: `${subject.id}_min`, name: `${subject.name}最小班级数` }
        );
    });
    const tableName = '县详细数据';
    return { tableHeader: [mainHeader, subHeader], downloadkeys, tableName };
}

function makeTableData(districts, dimension) {
    if(dimension.label === '周授课时对比') {
        return districts.week
    } else {
        return districts.class
    }
}