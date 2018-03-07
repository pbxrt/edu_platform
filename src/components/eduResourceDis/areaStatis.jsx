import React from 'react';
import EchartsForReact from 'echarts-for-react'
import Echarts from 'echarts';

import { colorsMap } from '../../shared/constants';

export default class AreaStatis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const config = makeConfig()
        return (
            <div className='section' style={{backgroundColor: colorsMap['B02']}} >
                <EchartsForReact
                    option={config}
                    style={{ width: '100%', height: 360, position: 'relative' }}
                />
            </div>
        )
    }
}

function makeConfig() {
    const barWidth = 36;
    const barGap = 0;
    const color1 = new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#f9a815' },
        { offset: 1, color: '#ff3c99' }
    ])
    const color2 = new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#293dbd' },
        { offset: 1, color: '#1baff3' }
    ]);
    const color3 = new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#fdf258' },
        { offset: 1, color: '#ffbe00' }
    ]);
    return {
        color: [ color1, color2, color3],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['教师', '学生', '家长'],
            textStyle: {
                color: '#fff',
                fontSize: 12
            }
        },
        calculable: true,
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
                    show: true,
                    lineStyle: {
                        color: '#113190',
                        width: 1,
                        type: 'dashed',
                    }
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
                name: '教师',
                type: 'bar',
                barBorderRadius: 10,
                barGap,
                barWidth,
                data: [320, 332, 301, 334, 390],
                itemStyle: {
                    normal: {
                        barBorderRadius: [18, 18, 0, 0],
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
                name: '学生',
                type: 'bar',
                barWidth,
                data: [220, 182, 191, 234, 290],
                itemStyle: {
                    normal: {
                        barBorderRadius: [18, 18, 0, 0],
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
                name: '家长',
                type: 'bar',
                barWidth,
                data: [150, 232, 201, 154, 190],
                itemStyle: {
                    normal: {
                        barBorderRadius: [18, 18, 0, 0],
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