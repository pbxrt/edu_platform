import React from 'react';
import _ from 'lodash';

import TableView from '../../../commonComponents/table';
import Toggle from '../../../commonComponents/binary-toggle';
import boy from '../../../images/boy.png';
import girl from '../../../images/girl.png';

export default class GenderCompare extends React.Component {
    constructor(props) {
        super(props);
        this.dimensions = [ { value: 'districts', label: '区县' }, { value: 'schools', label: '学校' }];
        this.tableData = this.props.targetData.genderCompare['districts'];
        this.state = {
            targetRow: this.tableData[0],
            currentDimension: this.dimensions[0]
        }
    }

    handleToggle(option) {
        this.tableData = this.props.targetData.genderCompare[option.value];
        this.setState({
            targetRow: this.tableData[0],
            currentDimension: option
        });
    }

    handleRowMouseEnter(rowData) {
        this.setState({ targetRow: rowData })
    }

    render() {
        const tableHeader = makeTableHeader(this.state.currentDimension);
        const boyNumber = getNumber(this.state.targetRow);
        return (
            <div className='section' >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36 }} >
                    <div className='section-title'>{this.state.currentDimension.label}用户分布明细：</div>
                    <Toggle options={this.dimensions} handleToggle={this.handleToggle.bind(this)} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                    <div style={{ width: 524, padding: '45px 104px', backgroundColor: '#112578' }} >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center', paddingBottom: 30}} >
                            <div style={{ color: '#2094e8'}} >
                                <img src={boy} alt='boy' style={{ width: 53, height: 61 }} />
                                <div style={{ fontSize: 22, padding: '10px 0 10px 0'}} >{_.round(this.state.targetRow.male * 100, 2)}%</div>
                                <div style={{ fontSize: 14}} >男生</div>
                            </div>
                            <div style={{ fontSize: 25}} >VS</div>
                            <div style={{ color: '#fe557a'}}>
                                <img src={girl} alt='boy' style={{ width: 69, height: 66 }} />
                                <div style={{ fontSize: 22, padding: '10px 12px 10px 0'}}>{_.round(this.state.targetRow.female * 100, 2)}%</div>
                                <div style={{ fontSize: 14, paddingRight: 12}}>女生</div>
                            </div>
                        </div>
                        <div style={{ width: 316, height: 55, display: 'flex', flexFlow: 'column wrap', justifyContent: 'space-between', alignContent: 'space-between'}} >
                            { _.map(_.range(80), v => (
                                <span key={v}
                                    style={{
                                        width: 10,
                                        height: 10,
                                        marginBottom: 2,
                                        backgroundColor: (v+1<=boyNumber) ? '#2094e8' : '#fe557a',
                                        transition: 'background-color 0.5s linear'
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                    <div style={{ width: 595 }} >
                        <TableView
                            tableHeader={tableHeader}
                            tableData={this.tableData}
                            headRowClassName={'thead-row-deep'}
                            bodyRowClassName={'tbody-row-deep'}
                            handleRowMouseEnter={this.handleRowMouseEnter.bind(this)}
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

function makeTableHeader(dimension) {
    const isDistrictDimension = dimension.value === 'districts';
    let mainHeader = [
        { id: 'number', name: '序号' },
        { id: isDistrictDimension ? 'district' : 'school', name: isDistrictDimension ? '区县' : '学校' },
        { id: 'male', name: '男生占比' },
        { id: 'female', name: '女生占比' }
    ];
    return [mainHeader];
}

function getNumber(targetRow) {
    const { male } = targetRow;
    let boyNumber = _.floor(80 * male);
    return boyNumber;
}