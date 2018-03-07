import React from 'react';

import LessonHoursStatis from './lessonHoursStatis';
import LessonHoursDis from './lessonHoursDis';
import AreaDetail from './areaDetail';
import SchoolDetail from './schoolDetail';


export default class CourseData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    
    render() {
        return (
            <div >
                <LessonHoursStatis />
                <LessonHoursDis />
                <AreaDetail />
                <SchoolDetail />
            </div>
        )
    }
}