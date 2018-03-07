import React from 'react';

import ChineseMap from '../../../commonComponents/chineseMap';
import Select from '../../../commonComponents/select';

const mockData = [
    { name: '区县', count: 15, radius: 42, color: 'rgba(254, 218, 0, 0.8)', left: 30, top: 275 },
    { name: '学校', count: 273, radius: 54, color: 'rgba(30, 173, 249, 0.8)', left: 72, top: 163 },
    { name: '总用户数', count: 2341, radius: 62, color: 'rgba(47, 209, 198, 0.8)', left: 100, top: 245 },
    { name: '教师', count: 986, radius: 73, color: 'rgba(145, 113, 222, 0.8)', left: 223, top: 90 },
    { name: '学生', count: 10875, radius: 83, color: 'rgba(80, 193, 89, 0.8)', left: 335, top: 149 },
    { name: '家长', count: 886, radius: 57, color: 'rgba(247, 149, 62, 0.9)', left: 343, top: 285 }
];

const emptyBubble = [
    { left: 40, top: 500, radius: 11 },
    { left: 200, top: 500, radius: 11 },
    { left: 50, top: 500, radius: 27 },
    { left: 459, top: 500, radius: 35 },
    { left: 339, top: 500, radius: 11 },
    { left: 490, top: 500, radius: 11 }
]

const periodOptions = [
    { value: '2017-2018年上学期1', label: '2017-2018年上学期1' },
    { value: '2017-2018年上学期2', label: '2017-2018年上学期2' },
    { value: '2017-2018年上学期3', label: '2017-2018年上学期3' },
    { value: '2017-2018年上学期4', label: '2017-2018年上学期4' },
    { value: '2017-2018年上学期5', label: '2017-2018年上学期5' }
]

const gradeOptions = [
    { value: '高一', label: '高一' },
    { value: '高二', label: '高二' },
    { value: '初一', label: '初一' },
    { value: '高三', label: '高三' }
]

export default class TotalStatis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    selectPeriod(period) {
        this.setState({ period })
    }

    selectGrade(grade) {
        this.setState({ grade })
    }

    render() {
        return (
            <div className='section' >
                <div style={{ textAlign: 'center', paddingRight: 165, paddingBottom: 40, fontSize: 22 }} >{this.props.city || '宁德市'}用户资源分布</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 50 }} >
                    <span className='section-title' >区域数据统计</span>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', paddingRight: 10 }} >
                        <Select
                            options={periodOptions}
                            handleSelect={this.selectPeriod.bind(this)}
                        />
                    </div>
                    <div >
                        <Select
                            options={gradeOptions}
                            handleSelect={this.selectGrade.bind(this)}
                        />
                    </div>
                </div>
                <div style={{ display: 'flex' }} >
                    <ChineseMap width={610} height={470} province={'福建'} city={'宁德市'} coordinate={[119.3, 26.39]} />
                    <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }} >
                        { mockData.map((data, i) => (
                            <div key={i} className='float-bubble' style={{ position: 'absolute', display: 'flex', flexFlow: 'column nowrap', justifyContent: 'center', alignItems: 'center', backgroundColor: data.color, width: data.radius * 2, height: data.radius * 2, left: data.left, top: data.top, borderRadius: '50%' }} >
                                <span style={{ fontSize: 14}} >{data.count}</span>
                                <span style={{ fontSize: 16}}>{data.name}</span>
                            </div>
                        ))}
                        { emptyBubble.map((data, i) => (
                            <div key={i}
                                className='empty-bubble'
                                style={{
                                    position: 'absolute',
                                    left: data.left,
                                    top: data.top,
                                    width: data.radius * 2,
                                    height: data.radius * 2,
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)'
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}