import React from 'react';
import _ from 'lodash';
import EchartsForReact from 'echarts-for-react'
import Echarts from 'echarts';

import Toggle from '../../commonComponents/binary-toggle';

const Item = ({ number, text }) => (
    <div>
        <span style={{ color: '#f2a60d', fontSize: 20 }} >{number}</span>
        <span style={{ color: '#a8c9f0', fontSize: 14, paddingLeft: 7 }} >{text}</span>
    </div>
)

export default class CityCompare extends React.Component {
    constructor(props) {
        super(props);
        this.dimensions = [ { value: 'districts', label: '区县' }, { value: 'schools', label: '学校' }];
        this.state = {
            currentDimension: this.dimensions[0]
        }
    }

    handleToggle(dimension) {
        this.setState({ currentDimension: dimension })
    }

    render() {
        const { targetData } = this.props;
        const [ totalTeacher, totalStudent, totalRate ] = makeTotalStatis(targetData, this.state.currentDimension)
        const option = makeOption(targetData, this.state.currentDimension)
        return (
            <div style={{ position: 'relative', width: 1155, margin: '0 auto', paddingBottom: 30}} >
                <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                    <Item number={totalTeacher} text={'教师'} />
                    <Item number={totalStudent} text={'学生'} />
                    <Item number={totalRate} text={'师生比'} />
                </div>
                <div style={{ position: 'absolute', right: 0, top: 60, zIndex: 1 }}>
                    <Toggle options={this.dimensions} handleToggle={this.handleToggle.bind(this)} />
                </div>
                <EchartsForReact
                    option={option}
                    style={{ width: '100%', height: 360, position: 'relative' }}
                />
            </div>
        )
    }
}

function makeTotalStatis(targetData, dimension) {
    const dimensionData = targetData.dis[dimension.value];
    const totalTeacher = _.chain(dimensionData).map('teacher').sum().value();
    const totalStudent = _.chain(dimensionData).map('student').sum().value();
    const totalRate = `1: ${_.floor(totalStudent/totalTeacher)}`;
    return [ totalTeacher, totalStudent, totalRate ];
}

function makeOption(targetData, dimension) {
    const dimensionData = targetData.dis[dimension.value];
    const barWidth = 30;
    const color = new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#293dbd' },
        { offset: 1, color: '#1baff3' }
    ]);
    const ratesInfo = _.chain(dimensionData).map(item => ({ name: item.name, rate: _.round(item.student/item.teacher)})).orderBy(['rate'], ['desc']).value()
    const categories = _.map(ratesInfo, 'name');
    const data = _.map(ratesInfo, 'rate');
    return {
        color: [color],
        type: 'bar',
        legend: {
            show: false
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            x: '5%',
            x2: '0%'
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {show: false},
                data: categories,
                axisLine: {
                    lineStyle: {
                        color: '#596ba9',
                        width: 2
                    }
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff'
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '比例',
                nameTextStyle: {
                    color: '#fff'
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#596ba9',
                        width: 2
                    }
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff'
                    },
                    formatter: function(d) {
                        if(d === 0) {
                            return 0
                        } else {
                            return `1 : ${d}`
                        }
                    }
                }
            }
        ],
        series: [
            {
                type: 'bar',
                name: '区县一',
                data,
                barWidth,
                itemStyle: {
                    normal: {
                        barBorderRadius: [15, 15, 0, 0],
                        label: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: '#fff'
                            },
                            formatter: function(d) {
                                return `1 : ${d.value}`
                            }
                        }
                    }
                },
                markLine: {
                    data: [
                        { type: 'average', name: '平均值' }
                    ]
                }
            }
        ]
    }
}