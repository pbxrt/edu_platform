import React from 'react';
import _ from 'lodash';
import EchartsForReact from 'echarts-for-react';
import Echarts from 'echarts';

const Item = ({ statis, description }) => (
    <div>
        <span style={{ color: '#f2a60d', fontSize: 28 }} >{statis}</span>
        <span style={{ color: '#a8c9f0', fontSize: 14, paddingLeft: 7 }} >{description}</span>
    </div>
)

export default class SubjectGrpCount extends React.Component {
    render() {
        const basicInfo = makeBasicInfo(this.props.targetData.grpCount)
        const option = makeOption(this.props.targetData.grpCount)
        return (
            <div className='section' >
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 25 }} >
                    { basicInfo.map(item => <Item key={item.description} statis={item.statis} description={item.description} />) }
                </div>
                <EchartsForReact
                    option={option}
                    style={{ width: '100%', height: 360, position: 'relative' }}
                />
            </div>
        )
    }
}

function makeBasicInfo({ school, absent, student, grpType, max, min }) {
    return [
        { statis: school, description: '所学校' },
        { statis: student, description: '名学生' },
        { statis: absent, description: '名未选' },
        { statis: grpType, description: '种组合' },
        { statis: max, description: '选科最多' },
        { statis: min, description: '选科最少' }
    ];
}

function makeOption({ groups }) {
    const categories = _.map(groups, 'name');
    const boyCount = _.map(groups, 'male');
    const girlCount = _.map(groups, 'female');
    const barWidth = 36;
    const color1 = new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#1baff3' },
        { offset: 1, color: '#293dbd' }
    ]);
    const color2 = new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#ff3c99' },
        { offset: 1, color: '#f9a815' }
    ])
    return {
        color: [ color1, color2],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['男', '女'],
            textStyle: {
                color: '#fff',
                fontSize: 12
            },
            selectedMode: false
        },
        grid: {
            x: '4.5%',
            x2: '0%'
        },
        calculable: true,
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
                    },
                    margin: 20
                }
            }
        ],
        series: [
            {
                name: '男',
                type: 'bar',
                barWidth,
                stack: 'sum',
                data: boyCount
            },
            {
                name: '女',
                type: 'bar',
                barWidth,
                stack: 'sum',
                data: girlCount,
                itemStyle: {
                    normal: {
                        barBorderRadius: [18, 18, 0, 0],
                        label: {
                            show: true,
                            position: 'top',
                            formatter: function(dataObj) {
                                let { value, dataIndex } = dataObj;
                                return value + boyCount[dataIndex]
                            },
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