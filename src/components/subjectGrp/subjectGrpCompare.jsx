import React from 'react';
import _ from 'lodash';
import EchartsForReact from 'echarts-for-react';

import TableView from '../../commonComponents/table';
import { colorsMap } from '../../shared/constants';
import { getPercentageFormat } from '../../lib/util';

const Icon = ({ startColor, endColor, text, rate }) => (
    <div style={{ display: 'flex', flexFlow: 'column nowrap', justifyContent: 'flex-end', alignItems: 'center', padding: '0 40px'}} >
        <span>{rate}%</span>
        <span style={{ background: startColor, width: 32, height: 32, borderRadius: 16, margin: '10px 0 7px 0' }} ></span>
        <span style={{ background: `linear-gradient(${startColor}, ${endColor})`, width: 46, height: rate*2, borderRadius: '23px 23px 0 0', transition: 'height 1s ease' }} ></span>
        <span style={{ paddingTop: 12}} >{text}</span>
    </div>
)

export default class SubjectGrpCompare extends React.Component {
    constructor(props) {
        super(props);
        this.tableData = makeTableData(this.props.targetData.grpCount);
        const { subjectGrp, male, female } = this.tableData[0];
        this.state = { subjectGrp, male, female }
    }

    componentWillReceiveProps(nextProps) {
        this.tableData = makeTableData(nextProps.targetData.grpCount);
        const { subjectGrp, male, female } = this.tableData[0];
        this.setState({ subjectGrp, male, female })
    }

    handleRowMouseEnter({ subjectGrp, male, female }) {
        this.setState({ subjectGrp, male, female })
    }

    render() {
        const option = makeOption(this.props.targetData.grpCount)
        const tableHeader = makeTableHeader()
        return (
            <div className='section' style={{backgroundColor: colorsMap['B02']}} >
                <div className='section-title' >选科组合占比：</div>
                <div style={{ display: 'flex', height: 330 }} >
                    <div ref='circle' style={{ flex: 1 }} >
                        <EchartsForReact
                            option={option}
                            style={{ width: '100%', height: '100%', position: 'relative' }}
                        />
                    </div>
                    <div style={{ flex: 1.2, overflow: 'auto' }} >
                        <TableView
                            tableHeader={tableHeader}
                            tableData={this.tableData}
                            headRowClassName={'thead-row-light'}
                            bodyRowClassName={'tbody-row-light'}
                            reserveRows
                            cancelTableSort
                            cancelDownload
                            handleRowMouseEnter={this.handleRowMouseEnter.bind(this)}
                        />
                    </div>
                    <div style={{ flex: 1, textAlign: 'center', display: 'flex', flexFlow: 'column nowrap', justifyContent: 'space-between' }} >
                        <header>{this.state.subjectGrp} 选科男女比例分析</header>
                        <div style={{ display: 'flex', justifyContent: 'center'}}>
                            <Icon startColor='#1cb6f9' endColor='#293dbd' text='男生' rate={this.state.male} />
                            <Icon startColor='#ff3c98' endColor='#f9a716' text='女生' rate={this.state.female} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function makeTableHeader() {
    const mainHeader = [
        { id: 'subjectGrp', name: '选科组合' },
        { id: 'rate', name: '选科占比' },
        { id: 'male', name: '男生占比', dataFormat: getPercentageFormat },
        { id: 'female', name: '女生占比', dataFormat: getPercentageFormat }
    ];
    return [mainHeader]
}

function makeTableData({ student, groups }) {
    let tableData = [];
    _.each(groups, item => {
        const row = {
            subjectGrp: item.name,
            rate: _.chain(item.male+item.female).divide(student).multiply(100).round(2).value(),
            male: _.chain(item.male).divide(item.male+item.female).multiply(100).round(2).value(),
            female: _.chain(item.female).divide(item.male+item.female).multiply(100).round(2).value()
        }
        tableData.push(row)
    });
    return tableData
}

function makeOption(grpCount) {
    const placeHolderStyle = {
        normal : {
            borderColor: 'rgba(0,0,0,0.1)',
            borderWidth: 5,
            color: 'rgba(0,0,0,0)',
            label: {show:false},
            labelLine: {show:false}
        }
    };
    const { student, groups } = grpCount;
    const formatData = _.chain(groups).slice(0, 5).map(item => ({ name: item.name, rate: _.chain(item.male+item.female).divide(student).multiply(100).round(2).value()})).value()
    const legendData = _.map(formatData, item => `${item.name}     ${item.rate}%`);
    const radiusArr = [[137, 139], [112, 114], [87, 89], [62, 64], [37, 39]];
    const colors = ['#ff4094', '#fc6b60', '#d0d7ec', '#0688fc', '#d0ba2c'];
    const series = _.map(formatData, (item, index) => ({
        name: legendData[index],
        type:'pie',
        clockWise:false,
        radius : radiusArr[index],
        hoverAnimation: false, //鼠标移入变大
        data:[
            {
                value: item.rate,
                "itemStyle": {
                    "normal": {
                        "borderColor": colors[index],
                        "borderWidth": 5,
                        labelLine: {show:false}
                    }
                },
            },
            {
                value: 100-item.rate,
                name:'invisible',
                itemStyle : placeHolderStyle
            }
        ]
    }));
    return  {
        color: ['#ff4094', '#fc6b60', '#d0d7ec', '#0688fc', '#d0ba2c'],
        title: {
            text: '',
            subtext: '',
            x: 'center',
            y: 'center',
            itemGap: 20,
            textStyle : {
                color : 'rgba(30,144,255,0.8)',
                fontFamily : '微软雅黑',
                fontSize : 35,
                fontWeight : 'bolder'
            }
        },
        legend: {
            orient : 'vertical',
            x : 195,
            y : 15,
            itemWidth: 8,
            itemheight: 8,
            itemGap: 13,
            textStyle: {
                color: 'auto',
            },
            icon: 'circle',
            data: legendData
        },
        series
    };
}