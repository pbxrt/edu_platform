import React from 'react';
import EchartsForReact from 'echarts-for-react';
import Echarts from 'echarts';

const Item = ({ statis, description }) => (
    <div>
        <span style={{ color: '#f2a60d', fontSize: 20 }} >{statis}</span>
        <span style={{ color: '#a8c9f0', fontSize: 14, paddingLeft: 7 }} >{description}</span>
    </div>
)

export default class SubjectGrpCount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const data = [
            { statis: 158, description: '所学校' },
            { statis: 87909, description: '名学生' },
            { statis: 16, description: '名未选' },
            { statis: 10, description: '种组合' },
            { statis: '生化政', description: '选科最多' },
            { statis: '物化技', description: '选科最少' }
        ]
        const option = makeOption()
        return (
            <div className='section' >
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 25 }} >
                    {data.map(item => <Item key={item.description} statis={item.statis} description={item.description} />)}
                </div>
                <div className='section-title'>选科组合分析：</div>
                <EchartsForReact
                    option={option}
                    style={{ width: '100%', height: 360, position: 'relative' }}
                />
            </div>
        )
    }
}

function makeOption() {
    const categories = ['生化政', '生化地', '生历地', '生历政', '物化历', '生历技', '生物地', '物化技'];
    const boyCount = [200, 190, 250, 60, 160, 80, 60, 100];
    const girlCount = [300, 230, 90, 220, 90, 120, 100, 0];
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