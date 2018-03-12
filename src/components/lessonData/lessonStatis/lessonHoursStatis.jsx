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

const Card = ({ text, name, mean, max, min, isMost }) => (
    <div style={{ textAlign: 'center', width: 282, height: 210, background: '#112272', borderRadius: 2 }} >
        <header style={{ height: 40, textAlign: 'center', lineHeight: '40px', background: '#11308d', borderRadius: '2px 2px 0 0' }} >
            {text}
            <span style={{color: isMost ? most : least}} >{isMost ? '最多' : '最少'}</span>
            的科目
        </header>
        <main style={{ height: 88, margin: '0 17px',color: isMost ? most : least, borderBottom: '1px solid #28397f', fontSize: 35, lineHeight: '87px' }} >{name}</main>
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
    render() {
        const { week: weekData, class: classData } = this.props.data;
        return (
            <div className='section' style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Card {...weekData.most} text={'人均授课周课时'} isMost />
                <Card {...weekData.least} text={'人均授课周课时'} />
                <Card {...classData.most} text={'人均授课班级'} isMost />
                <Card {...classData.least} text={'人均授课班级'} />
            </div>
        )
    }
}