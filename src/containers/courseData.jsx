import React from 'react';

import FloatToggle from '../commonComponents/float-toggle';
import CourseStatis from '../components/courseData/courseStatis';
import CourseDetail from '../components/courseData/courseDetail';

const options = [
    { value: '课程数据统计', label: '课程数据统计' },
    { value: '课程数据详情', label: '课程数据详情' }
];

export default class CourseData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            option: options[0]
        }
    }

    handleSelect(option) {
        this.setState({ option })
        console.log('courseData-toggle-option =>', option);
    }
    
    render() {
        return (
            <div className='report' >
                <FloatToggle options={options} handleSelect={this.handleSelect.bind(this)} />
                { this.state.option.value === '课程数据统计' ? <CourseStatis /> : null }
                { this.state.option.value === '课程数据详情' ? <CourseDetail /> : null }
            </div>
        )
    }
}