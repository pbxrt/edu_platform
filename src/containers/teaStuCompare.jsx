import React from 'react';

import CityCompare from '../components/teaStuCompare/cityCompare';
import DistrictCompare from '../components/teaStuCompare/districtCompare';
import SchoolCompare from '../components/teaStuCompare/schoolCompare';

const periodOptions = [
    { value: '2017-2018学年上学期', label: '2017-2018学年上学期' },
    { value: '2017-2018学年上学期1', label: '2017-2018学年上学期1' },
    { value: '2017-2018学年上学期2', label: '2017-2018学年上学期2' },
    { value: '2017-2018学年上学期3', label: '2017-2018学年上学期3' }
];

const gradeOptions = [
    { value: '高一', label: '高一' },
    { value: '高二', label: '高二' },
    { value: '初一', label: '初一' },
    { value: '高三', label: '高三' }
]

export default class TeaStuCompare extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className='report' >
                <CityCompare periodOptions={periodOptions} gradeOptions={gradeOptions} city={'宁德市'} />
                <DistrictCompare />
                <SchoolCompare />
            </div>
        )
    }
}