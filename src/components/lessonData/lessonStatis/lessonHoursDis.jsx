import React from 'react';
import EchartsForReact from 'echarts-for-react'
import _ from 'lodash';

import { colorsMap } from '../../../shared/constants'

export default class LessonHoursDis extends React.Component {
    render() {
        const option = makeOption()
        return (
            <div className='section' style={{backgroundColor: colorsMap['B02']}} >
                <div className='section-title'>课时各学科分布</div>
                <EchartsForReact
                    option={option}
                    style={{ width: '100%', height: 400, position: 'relative' }}
                />
            </div>
        )
    }
}

function makeOption() {
    const categories = ['语文', '英语', '数学', '化学', '生物', '地理', '政治', '物理', '历史'];
    return {
        color: ['#fee13c', '#7ed6fc', '#fc6962'],
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            icon: 'circle',
            data: [
                { name: '最大课时' },
                { name: '平均课时' },
                { name: '最小课时' },
            ],
            textStyle: {
                color: '#fff'
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
                name: '课时',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['rgba(0,0,0,0.2)'],
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
        lineStyle: {
            width: 5
        },
        series: [
            {
                name: '最大课时',
                type: 'line',
                data: [30, 24, 34, 25, 27, 25, 28, 17, 24],
                symbolSize: 16,
                symbol: 'circle',
                hoveranimaiton: false,
                itemStyle: {
                    normal: {
                        lineStyle: {
                            width: 0.5
                        }
                    }
                }
            },
            {
                name: '平均课时',
                type: 'line',
                symbol: 'circle',
                symbolSize: 16,
                data: [ 23, 17, 27, 20, 23, 20, 23, 14, 20],
                itemStyle: {
                    normal: {
                        lineStyle: {
                            width: 0.5
                        }
                    }
                }
            },
            {
                name: '最小课时',
                type: 'line',
                symbolSize: 16,
                symbol: 'circle',
                data: [17, 12, 23, 15, 19, 15, 17, 4, 15],
                itemStyle: {
                    normal: {
                        lineStyle: {
                            width: 0.5
                        }
                    }
                }
            },
        ]
    }
}