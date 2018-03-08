import React from 'react';
import _ from 'lodash';
import EchartsForReact from 'echarts-for-react'
import Echarts from 'echarts';

import Select from '../../commonComponents/select';
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
        this.options = [ { value: '区县', label: '区县' }, { value: '学校', label: '学校' }];
        this.state = {
            data: [39, 29, 26, 17, 12]
        }
    }

    selectPeriod(period) {
        this.setState({ period })
    }

    selectGrade(grade) {
        this.setState({ grade })
    }

    handleToggle(option) {
        let newData = [];
        for(let i=0; i<5; i++) {
            newData.push(_.random(10, 40))
        }
        this.setState({
            data: newData
        })
    }

    render() {
        const { periodOptions, gradeOptions, city } = this.props;
        const option = makeOption(this.state.data)
        return (
            <div >
                <div style={{width: 1155, margin: '0 auto', padding: '40px 0 60px 0'}} >
                    <header style={{ position: 'relative', padding: '18px 0 68px 0' }} >
                        <div style={{ position: 'absolute', right: 0, display: 'flex', justifyContent: 'flex-end' }} >
                            <Select
                                options={periodOptions}
                                handleSelect={this.selectPeriod.bind(this)}
                            />
                            <div style={{ display: 'inline-block', paddingLeft: 10}} >
                                <Select
                                    options={gradeOptions}
                                    handleSelect={this.selectGrade.bind(this)}
                                    width={100}
                                />
                            </div>
                        </div>
                        <div style={{ fontSize: 22, textAlign: 'center' }} >{city}师生比例分析</div>
                    </header>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                        <Item number={179} text={'教师'} />
                        <Item number={160997} text={'学生'} />
                        <Item number={'1:28'} text={'师生比'} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '25px 0' }} >
                        <div className='section-title'>师生有效比分布：</div>
                        <Toggle options={this.options} handleToggle={this.handleToggle.bind(this)} />
                    </div>
                    <EchartsForReact
                        option={option}
                        style={{ width: '100%', height: 360, position: 'relative' }}
                    />
                </div>
            </div>
        )
    }
}

function makeOption(data) {
    const barWidth = 30;
    const color = new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#293dbd' },
        { offset: 1, color: '#1baff3' }
    ]);
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
                data: ['区域一', '区域二', '区域三', '区域四', '区域五'],
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