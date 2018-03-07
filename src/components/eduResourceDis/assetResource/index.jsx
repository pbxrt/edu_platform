import React from 'react';

import TotalStatis from '../totalStatis';
import AreaStatis from '../areaStatis';
import GenderCompare from './genderCompare';
import AreaDetail from './areaDetail';
import SchoolDetail from './schoolDetail';
import ClassDetail from './classDetail';

export default class AssetResource extends React.Component {
    render() {
        return (
            <div>
                <TotalStatis />
                <AreaStatis />
                <GenderCompare />
                <AreaDetail />
                <SchoolDetail />
                <ClassDetail />
            </div>
        )
    }
}