import React from 'react';

import TotalStatis from '../components/eduResourceDis/totalStatis';
import AreaStatis from '../components/eduResourceDis/areaStatis';
import GenderCompare from '../components/eduResourceDis/genderCompare';
import AreaDetail from '../components/eduResourceDis/areaDetail';
import SchoolDetail from '../components/eduResourceDis/schoolDetail';

export default class EduResourceDis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className='report' >
                <TotalStatis />
                <AreaStatis />
                <GenderCompare />
                <AreaDetail />
                <SchoolDetail />
            </div>
        )
    }
}