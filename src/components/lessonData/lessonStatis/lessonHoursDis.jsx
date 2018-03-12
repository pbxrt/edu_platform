import React from 'react';
import EchartsForReact from 'echarts-for-react'
import _ from 'lodash';

import { colorsMap } from '../../../shared/constants'

export default class LessonHoursDis extends React.Component {
    render() {
        const { lessonHours } = this.props.data;
        const option = makeOption(lessonHours)
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

function makeOption(lessonHours) {
    const categories = _.map(lessonHours, 'name');
    const maxHours = _.map(lessonHours, 'max');
    const meanHours = _.map(lessonHours, 'mean');
    const minHours = _.map(lessonHours, 'min');
    const legendData = [{ name: '最大课时' },{ name: '平均课时' },{ name: '最小课时' }];
    const series = _.map([maxHours, meanHours, minHours], (hours, index) => ({
        name: legendData[index].name,
        type: 'line',
        data: hours,
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
    }));
    return {
        color: ['#fee13c', '#7ed6fc', '#fc6962'],
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            icon: 'circle',
            data: legendData,
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
        series
    }
}