import React from 'react';

import ChineseMap from '../../../commonComponents/chineseMap';

const emptyBubble = [
    { left: 40, top: 500, radius: 11 },
    { left: 200, top: 500, radius: 11 },
    { left: 50, top: 500, radius: 27 },
    { left: 459, top: 500, radius: 35 },
    { left: 339, top: 500, radius: 11 },
    { left: 490, top: 500, radius: 11 }
]

export default class TotalStatis extends React.Component {
    render() {
        const bubbleData = formatBubbleData(this.props.statis)
        return (
            <div className='section' >
                <div style={{ display: 'flex' }} >
                    <ChineseMap width={610} height={470} province={'福建'} city={'宁德市'} coordinate={[119.3, 26.39]} />
                    <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }} >
                        { bubbleData.map((data, i) => (
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

function formatBubbleData(statis) {
    debugger;
    const { subjectCount, requiredCourse, courseCount, selfSelectCourse } = statis;
    return [
        { name: '学科', count: subjectCount, radius: 62, color: 'rgba(47, 209, 198, 0.8)', left: 100, top: 245 },
        { name: '必修课', count: requiredCourse, radius: 73, color: 'rgba(145, 113, 222, 0.8)', left: 223, top: 90 },
        { name: '课程数', count: courseCount, radius: 83, color: 'rgba(80, 193, 89, 0.8)', left: 335, top: 149 },
        { name: '自选课', count: selfSelectCourse, radius: 57, color: 'rgba(247, 149, 62, 0.9)', left: 343, top: 285 }
    ];
}