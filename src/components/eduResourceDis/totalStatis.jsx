import React from 'react';

import ChineseMap from '../../commonComponents/chineseMap';

const emptyBubble = [
    { left: 40, top: 500, radius: 11 },
    { left: 200, top: 500, radius: 11 },
    { left: 50, top: 500, radius: 27 },
    { left: 459, top: 500, radius: 35 },
    { left: 339, top: 500, radius: 11 },
    { left: 490, top: 500, radius: 11 }
];

export default class TotalStatis extends React.Component {
    render() {
        const { targetData, type } = this.props;
        const bubbleData = formatBubbleData(targetData.totalStatis, type)
        return (
            <div className='section' style={{ display: 'flex' }} >
                <ChineseMap width={610} height={470} province={'福建'} city={'宁德市'} coordinate={[119.3, 26.39]} />
                <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }} >
                    { bubbleData.map((data, i) => (
                        <div key={i} className='float-bubble' style={{ position: 'absolute', display: 'flex', flexFlow: 'column nowrap', justifyContent: 'center', alignItems: 'center', textAlign: 'center', backgroundColor: data.color, width: data.radius * 2, height: data.radius * 2, left: data.left, top: data.top, borderRadius: '50%' }} >
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
        )
    }
}

function formatBubbleData(totalStatis, type) {
    if(type === 'user') {
        const { users, schools, districts, teachers, students, parents } = totalStatis;
        return [
            { name: '区县', count: districts, radius: 42, color: 'rgba(254, 218, 0, 0.8)', left: 30, top: 275 },
            { name: '学校', count: schools, radius: 54, color: 'rgba(30, 173, 249, 0.8)', left: 72, top: 163 },
            { name: '总用户数', count: users, radius: 62, color: 'rgba(47, 209, 198, 0.8)', left: 100, top: 245 },
            { name: '教师', count: teachers, radius: 73, color: 'rgba(145, 113, 222, 0.8)', left: 223, top: 90 },
            { name: '学生', count: students, radius: 83, color: 'rgba(80, 193, 89, 0.8)', left: 335, top: 149 },
            { name: '家长', count: parents, radius: 57, color: 'rgba(247, 149, 62, 0.9)', left: 343, top: 285 }
        ];
    } else {
        const { schools, districts, classrooms, teachClass, adminClass, over66Class } = totalStatis;
        return [
            { name: '区县', count: districts, radius: 42, color: 'rgba(254, 218, 0, 0.8)', left: 30, top: 275 },
            { name: '学校', count: schools, radius: 54, color: 'rgba(30, 173, 249, 0.8)', left: 72, top: 163 },
            { name: <div><div>超过66人</div><div>班级数</div></div>, count: over66Class, radius: 62, color: 'rgba(254, 85, 122, 0.8)', left: 100, top: 245 },
            { name: '教室', count: classrooms, radius: 73, color: 'rgba(145, 113, 222, 0.8)', left: 223, top: 90 },
            { name: '教学班', count: teachClass, radius: 83, color: 'rgba(80, 193, 89, 0.8)', left: 335, top: 149 },
            { name: '行政班', count: adminClass, radius: 57, color: 'rgba(247, 149, 62, 0.9)', left: 343, top: 285 }
        ];
    }
}