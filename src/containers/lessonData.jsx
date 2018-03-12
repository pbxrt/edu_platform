import React from 'react';

import FloatToggle from '../commonComponents/float-toggle';
import LessonStatis from '../components/lessonData/lessonStatis';
import LessonDetail from '../components/lessonData/lessonDetail';
import mockData from '../mockData/lesson.json';


const options = [
    { value: '课时数据统计', label: '课时数据统计' },
    { value: '课时数据详情', label: '课时数据详情' }
]

export default class LessonData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            option: options[0]
        }
    }

    handleSelect(option) {
        this.setState({ option })
        console.log('lessonData-toggle-option =>', option);
    }

    render() {
        return (
            <div className='report' >
                <FloatToggle options={options} handleSelect={this.handleSelect.bind(this)} />
                { this.state.option.value === '课时数据统计' ? <LessonStatis statis={mockData.statis} /> : null }
                { this.state.option.value === '课时数据详情' ? <LessonDetail statis={mockData.detail} /> : null }
            </div>
        )
    }
}

