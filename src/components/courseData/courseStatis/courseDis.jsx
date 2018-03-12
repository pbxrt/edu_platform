import React from 'react';
import _ from 'lodash';
import EchartsForReact from 'echarts-for-react'
import Echarts from 'echarts';

import Toggle from '../../../commonComponents/binary-toggle';


export default class CourseDis extends React.Component {
    constructor(props) {
        super(props);
        this.dimensions = [ { value: '区县', label: '区县' }, { value: '学校', label: '学校' }];
        this.state = {
            currentDimension: this.dimensions[0]
        }
    }

    handleToggle(dimension) {
        this.setState({
            currentDimension: dimension
        })
    }

    render() {
        const option = makeOption(this.props.statis, this.state.currentDimension)
        return (
            <div className='section' style={{ backgroundColor: '#112b84' }} >
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '25px 0' }} >
                    <div className='section-title'>课程类型分布：</div>
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

function makeOption(statis, dimension) {
    const dimensionMap = {
        "区县": 'districts',
        "学校": 'schools'
    };
    const targetInfo = statis.courseDis[dimensionMap[dimension.value]];
    const categories = _.map(targetInfo, 'name');
    const requiredCourseCount = _.map(targetInfo, 'required');
    const electiveCourseCount = _.map(targetInfo, 'elective')
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
            data: ['必修课', '自选课'],
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
                name: '必修课',
                data: requiredCourseCount,
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
                name: '自选课',
                data: electiveCourseCount,
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