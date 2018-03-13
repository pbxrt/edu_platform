import React from 'react';
import _ from 'lodash';
import EchartsForReact from 'echarts-for-react';

import { colorsMap } from '../../shared/constants';

const Icon = ({ startColor, endColor, text, rate }) => (
    <div style={{ display: 'flex', flexFlow: 'column nowrap', justifyContent: 'flex-end', alignItems: 'center', padding: '0 40px'}} >
        <span>{rate}%</span>
        <span style={{ background: startColor, width: 32, height: 32, borderRadius: 16, margin: '10px 0 7px 0' }} ></span>
        <span style={{ background: `linear-gradient(${startColor}, ${endColor})`, width: 46, height: rate*2, borderRadius: '23px 23px 0 0', transition: 'height 1s ease' }} ></span>
        <span style={{ paddingTop: 12}} >{text}</span>
    </div>
)

export default class SubjectGrpCompare extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [
                { subjectGrp: '生化政', boy: '60%', girl: '40%' },
                { subjectGrp: '生化政', boy: '60%', girl: '40%' },
                { subjectGrp: '生化政', boy: '60%', girl: '40%' },
                { subjectGrp: '生化政', boy: '60%', girl: '40%' },
                { subjectGrp: '生化政', boy: '60%', girl: '40%' },
                { subjectGrp: '生化政', boy: '60%', girl: '40%' },
                { subjectGrp: '生化政', boy: '60%', girl: '40%' }
            ],
            rate: {
                boy: 60,
                girl: 40
            }
        }
    }

    componentDidMount() {
        console.log(this.refs.circle.offsetWidth)
        setInterval(() => {
            let boy = _.random(0, 100);
            this.setState({
                rate: {
                    boy,
                    girl: 100-boy
                }
            })
        }, 10000)
    }

    render() {
        const option = makeOption()
        return (
            <div className='section' style={{backgroundColor: colorsMap['B02']}} >
                <div className='section-title' >选科组合占比</div>
                <div style={{ display: 'flex', height: 330 }} >
                    <div ref='circle' style={{ flex: 1 }} >
                        <EchartsForReact
                            option={option}
                            style={{ width: '100%', height: '100%', position: 'relative' }}
                        />
                    </div>
                    <div style={{ flex: 1 }} >
                        table
                    </div>
                    <div style={{ flex: 1, textAlign: 'center', display: 'flex', flexFlow: 'column nowrap', justifyContent: 'space-between' }} >
                        <header>{'生历地'}选科男女比例分析</header>
                        <div style={{ display: 'flex', justifyContent: 'center'}}>
                            <Icon startColor='#1cb6f9' endColor='#293dbd' text='男生' rate={this.state.rate.boy} />
                            <Icon startColor='#ff3c98' endColor='#f9a716' text='女生' rate={this.state.rate.girl} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const placeHolderStyle = {
    normal : {
        borderColor: 'rgba(0,0,0,0.1)',
        borderWidth: 5,
        color: 'rgba(0,0,0,0)',
        label: {show:false},
        labelLine: {show:false}
    }
};

function makeOption() {
    return  {
        color: ['#ff4094', '#fc6b60', '#d0d7ec', '#0688fc', '#d0ba2c'],
        title: {
            text: '',
            subtext: '',
            x: 'center',
            y: 'center',
            itemGap: 20,
            textStyle : {
                color : 'rgba(30,144,255,0.8)',
                fontFamily : '微软雅黑',
                fontSize : 35,
                fontWeight : 'bolder'
            }
        },
        legend: {
            orient : 'vertical',
            x : 195,
            y : 15,
            itemWidth: 8,
            itemheight: 8,
            itemGap: 13,
            textStyle: {
                color: 'auto',
            },
            icon: 'circle',
            data: ['生化政     37%','生化历     26%','生化地     18%', '物化地     10%', '历地技     9%']
        },
        series : [
            {
                name:'生化政     37%',
                type:'pie',
                clockWise:false,
                radius : [137, 139],
                hoverAnimation: false, //鼠标移入变大
                data:[
                    {
                        value:37,
                        "itemStyle": {
                            "normal": {
                                "borderColor": '#ff4094',
                                "borderWidth": 5,
                                labelLine: {show:false}
                            }
                        },
                    },
                    {
                        value:63,
                        name:'invisible',
                        itemStyle : placeHolderStyle
                    }
                ]
            },
            {
                name:'生化历     26%',
                type:'pie',
                clockWise:false,
                radius : [112, 114],
                hoverAnimation: false, //鼠标移入变大
                data:[
                    {
                        value:26, 
                        "itemStyle": {
                            "normal": {
                                "borderColor": '#fc6b60',
                                "borderWidth": 5,
                                labelLine: {show:false}
                            }
                        },
                    },
                    {
                        value:84,
                        name:'invisible',
                        itemStyle : placeHolderStyle
                    }
                ]
            },
            {
                name:'生化地     18%',
                type:'pie',
                clockWise:false,
                radius : [87, 89],
                hoverAnimation: false, //鼠标移入变大
                data:[
                    {
                        value:18, 
                        "itemStyle": {
                            "normal": {
                                borderColor: '#d0d7ec',
                                "borderWidth": 5,
                                labelLine: {show:false}
                            }
                        },
                    },
                    {
                        value:82,
                        name:'invisible',
                        itemStyle : placeHolderStyle
                    }
                ]
            },
            {
                name:'物化地     10%',
                type:'pie',
                clockWise:false,
                radius : [62, 64],
                hoverAnimation: false, //鼠标移入变大
                data:[
                    {
                        value:10, 
                        "itemStyle": {
                            "normal": {
                                borderColor: '#0688fc',
                                "borderWidth": 5,
                                labelLine: {show:false}
                            }
                        },
                    },
                    {
                        value:90,
                        name:'invisible',
                        itemStyle : placeHolderStyle
                    }
                ]
            },
            {
                name:'历地技     9%',
                type:'pie',
                clockWise:false,
                radius : [37, 39],
                hoverAnimation: false, //鼠标移入变大
                data:[
                    {
                        value:9, 
                        "itemStyle": {
                            "normal": {
                                borderColor: '#d0ba2c',
                                "borderWidth": 5,
                                labelLine: {show:false}
                            }
                        },
                    },
                    {
                        value:91,
                        name:'invisible',
                        itemStyle : placeHolderStyle
                    }
                ]
            }
        ]
    };
}