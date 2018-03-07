import React from 'react';

import TotalStatis from '../totalStatis';
import AreaStatis from '../areaStatis';
import GenderCompare from './genderCompare';
import AreaDetail from './areaDetail';
import SchoolDetail from './schoolDetail';

export default class UserResource extends React.Component {
    render() {
        return (
            <div>
                <TotalStatis />
                <AreaStatis />
                <GenderCompare />
                <AreaDetail />
                <SchoolDetail />
            </div>
        )
    }
}