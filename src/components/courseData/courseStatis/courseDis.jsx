import React from 'react';
import _ from 'lodash';
import EchartsForReact from 'echarts-for-react'
import Echarts from 'echarts';

import Toggle from '../../../commonComponents/binary-toggle';


export default class CourseDis extends React.Component {
    constructor(props) {
        super(props);
        this.options = this.options = [ { value: '区县', label: '区县' }, { value: '学校', label: '学校' }];
        this.state = {

        }
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
        const option = makeOption()
        return (
            <div className='section' style={{ backgroundColor: '#112b84' }} >
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '25px 0' }} >
                    <div className='section-title'>课程类型分布：</div>
                    <Toggle options={this.options} handleToggle={this.handleToggle.bind(this)} />
                </div>
                <EchartsForReact
                    option={option}
                    style={{ width: '100%', height: 360, position: 'relative' }}
                />
            </div>
        )
    }
}

function makeOption() {
    const barWidth = 30;
    const color1 = new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#293dbd' },
        { offset: 1, color: '#1baff3' }
    ]);
    const color2 = new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#ff3c99' },
        { offset: 1, color: '#f9a815' }
    ])
    return {
        color: [color1, color2],
        type: 'bar',
        legend: {
            show: true,
            data: ['区县一', '区县二'],
            textStyle: {
                color: '#fff'
            }
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
                name: '人数',
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
                    }
                }
            }
        ],
        series: [
            {
                type: 'bar',
                name: '区县一',
                data: [400, 340, 250, 160, 120],
                barWidth,
                barGap: 0,
                itemStyle: {
                    normal: {
                        barBorderRadius: [15, 15, 0, 0],
                        label: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                }
            },
            {
                type: 'bar',
                name: '区县二',
                data: [100, 100, 150, 170, 120],
                barWidth,
                itemStyle: {
                    normal: {
                        barBorderRadius: [15, 15, 0, 0],
                        label: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                }
            }
        ]
    }
}