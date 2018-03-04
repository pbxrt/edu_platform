import React from 'react';
import _ from 'lodash';

import TableView from '../../commonComponents/tableView';
import boy from '../../images/boy.png';
import girl from '../../images/girl.png';

const ToggleButton = ({ type, handleToggle }) => {
    return (
        <div style={{ width: 130, height: 38, border: '2px solid #0761cb', borderRadius: 19,display: 'flex', cursor: 'pointer' }} >
            <div onClick={handleToggle.bind(null, 'area')} style={{ width: 63, height: 34, color: '#fff', borderRadius: 15, lineHeight: '34px', backgroundColor: type==='area' ? '#0761cb' : 'transparent', textAlign: 'center' }} >区县</div>
            <div onClick={handleToggle.bind(null, 'school')} style={{ width: 63, height: 34, color: '#fff', borderRadius: 15, lineHeight: '34px', backgroundColor: type==='school' ? '#0761cb' : 'transparent', textAlign: 'center' }} >学校</div>
        </div>
    )
}
export default class GenderCompare extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'area'
        }
    }

    handleToggle(type) {
        this.setState({ type })
    }

    render() {
        const tableHeader = makeTableHeader();
        const tableData = makeTableData();
        const { boyNumber, girlNumber } = getNumber(0.6215, 0.3785);
        return (
            <div className='section' >
                <div style={{ width: 1320, paddingLeft: 165, margin: '0 auto' }} >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36 }} >
                        <div className='section-title'>区县用户分布明细：</div>
                        <ToggleButton type={this.state.type} handleToggle={this.handleToggle.bind(this)} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                        <div style={{ width: 524, padding: '45px 104px', backgroundColor: '#112578' }} >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center', paddingBottom: 30}} >
                                <div style={{ color: '#2094e8'}} >
                                    <img src={boy} alt='boy' style={{ width: 53, height: 61 }} />
                                    <div style={{ fontSize: 22, padding: '10px 0 10px 0'}} >62.15%</div>
                                    <div style={{ fontSize: 14}} >男生</div>
                                </div>
                                <div style={{ fontSize: 25}} >VS</div>
                                <div style={{ color: '#fe557a'}}>
                                    <img src={girl} alt='boy' style={{ width: 69, height: 66 }} />
                                    <div style={{ fontSize: 22, padding: '10px 12px 10px 0'}}>37.85%</div>
                                    <div style={{ fontSize: 14, paddingRight: 12}}>女生</div>
                                </div>
                            </div>
                            <div style={{ width: 316, height: 55, display: 'flex', flexFlow: 'column wrap', justifyContent: 'space-between', alignContent: 'space-between'}} >
                                { _.map(_.range(boyNumber), v => ( <span key={v} style={{ width: 10, height: 10, marginBottom: 2, backgroundColor: '#2094e8'}} ></span>)) }
                                { _.map(_.range(girlNumber), v => ( <span key={v} style={{ width: 10, height: 10, marginBottom: 2, backgroundColor: '#fe557a'}} ></span>)) }
                            </div>
                        </div>
                        <div style={{ width: 595 }} >
                            <TableView tableHeader={tableHeader} tableData={tableData} reserveRows cancelTableSort cancelDownload />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function makeTableHeader() {
    let mainHeader = [
        { id: 'number', name: '序号' },
        { id: 'area', name: '区县' },
        { id: 'male_rate', name: '男生占比' },
        { id: 'female_rate', name: '女生占比' }
    ];
    _.each(mainHeader, cell => {
        cell.style = { padding: '10px 0 9px 35px', backgroundColor: '#123391' };
        cell.columnStyle = { padding: '9px 0 9px 35px', backgroundColor: '#112578', borderTop: '1px solid #123391'}
    });
    return [mainHeader];
}

function makeTableData() {
    let tableData = [];
    tableData.push({
        number: 1,
        area: '全部',
        male_rate: '70%',
        female_rate: '30%'
    });
    for(let i=1; i<=6; i++) {
        let male_rate = _.random(0, 70);
        let row = {
            number: i+1,
            area: `区县${i}`,
            male_rate: `${male_rate}%`,
            female_rate: `${100 - male_rate}%`
        };
        tableData.push(row)
    }
    return tableData;
}

function getNumber(boyRate, girlRate) {
    let boyNumber = _.floor(80 * boyRate);
    let girlNumber = 80 - boyNumber;
    return { boyNumber, girlNumber};
}