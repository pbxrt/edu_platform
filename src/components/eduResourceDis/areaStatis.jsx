import React from 'react';
import _ from 'lodash';
import EchartsForReact from 'echarts-for-react'
import Echarts from 'echarts';

import { colorsMap } from '../../shared/constants';
import Toggle from '../../commonComponents/binary-toggle';

export default class AreaStatis extends React.Component {
    constructor(props) {
        super(props);
        this.dimensions = [{ value: '区县', label: '区县' }, { value: '学校', label: '学校' }];
        this.state = {
            currentDimension: this.dimensions[0]
        };
    }
    handleToggle(dimension) {
        this.setState({ currentDimension: dimension })
    }
    render() {
        const option = makeOption(this.props.targetData.dis, this.state.currentDimension)
        return (
            <div className='section' style={{backgroundColor: colorsMap['B02']}} >
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '25px 0' }} >
                    <div className='section-title'>用户资源分布：</div>
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

function makeOption(distribution, dimension) {
    let targetDis;
    if(dimension.label === '区县') {
        targetDis = distribution.districts;
    } else {
        targetDis = distribution.schools
    }
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
    const legendName = _.map(distribution.legend, 'name');
    const legendKeys = _.map(distribution.legend, 'key');
    const categories = _.map(targetDis, 'name');
    const barWidth = 30;
    const barGap = 0;
    const series =
        _.chain(legendKeys)
        .map(key => _.map(targetDis, key))
        .map((item, index) => ({
            name: legendName[index],
            type: 'bar',
            barGap,
            barWidth,
            data: item,
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
        })).value()
    return {
        color: [ color1, color2, color3],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: legendName,
            textStyle: {
                color: '#fff',
                fontSize: 12
            }
        },
        calculable: true,
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
        series
    }
}