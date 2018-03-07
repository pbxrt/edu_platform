import React from 'react';
import _ from 'lodash';

import Select from '../../../commonComponents/select';

const mockData = [
    { text: '人均授课周课时', subject: '数学', mean: 10, max: 13, min: 6, isMost: true },
    { text: '人均授课周课时', subject: '英语', mean: 10, max: 13, min: 6, isMost: false },
    { text: '人均授课班级', subject: '语文', mean: 10, max: 13, min: 6, isMost: true },
    { text: '人均授课班级', subject: '物理', mean: 10, max: 13, min: 6, isMost: false }
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

const most = '#fdf258';
const least = '#fe557a';

const Card = ({ text, subject, mean, max, min, isMost }) => (
    <div style={{ textAlign: 'center', width: 282, height: 210, background: '#112272', borderRadius: 2 }} >
        <header style={{ height: 40, textAlign: 'center', lineHeight: '40px', background: '#11308d', borderRadius: '2px 2px 0 0' }} >
            {text}
            <span style={{color: isMost ? most : least}} >{isMost ? '最多' : '最少'}</span>
            的科目
        </header>
        <main style={{ height: 88, margin: '0 17px',color: isMost ? most : least, borderBottom: '1px solid #28397f', fontSize: 35, lineHeight: '87px' }} >{subject}</main>
        <div style={{ margin: '15px 17px', display: 'flex', justifyContent: 'space-between' }} >
            <div style={{ flex: 1, borderRight: '1px solid #28397f' }} >
                <div style={{ fontSize: 20, color: '#7ed8fd'}} >{mean}</div>
                <div>平均课时数</div>
            </div>
            <div style={{ flex: 1, borderRight: '1px solid #28397f' }} >
                <div style={{ fontSize: 20, color: '#7ed8fd'}}>{max}</div>
                <div>最大课时数</div>
            </div>
            <div style={{ flex: 1 }} >
                <div style={{ fontSize: 20, color: '#7ed8fd'}}>{min}</div>
                <div>最少课时数</div>
            </div>
        </div>
    </div>
)

export default class LessonHoursStatis extends React.Component {
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
        const city = '宁德市'
        const grade = '高一'
        return (
            <div className='section'>
                <div style={{ fontSize: 22, textAlign: 'center', paddingRight: 165 }} >{city}{grade}课时数据统计</div>
                <header style={{ padding: '18px 0 68px 0', textAlign: 'right' }} >
                    <div style={{ display: 'inline-block' }} >
                        <Select
                            options={periodOptions}
                            handleSelect={this.selectPeriod.bind(this)}
                        />
                    </div>
                    <div style={{ display: 'inline-block', marginLeft: 10 }} >
                        <Select
                            options={gradeOptions}
                            handleSelect={this.selectGrade.bind(this)}
                        />
                    </div>
                </header>
                <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                    { _.map(mockData, (data, i) => (<Card key={i} {...data} />))}      
                </div>
            </div>
        )
    }
}