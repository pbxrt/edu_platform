import React from 'react';

import TotalStatis from './totalStatis';
import CourseDis from './courseDis';
import AreaDetail from './areaDetail';
import SchoolDetail from './schoolDetail';

export default class CourseStatis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    
    render() {
        return (
            <div>
                <TotalStatis />
                <CourseDis />
                <AreaDetail />
                <SchoolDetail />
            </div>
        )
    }
}