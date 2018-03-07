import React from 'react';
import _ from 'lodash';

import { colorsMap } from '../../../shared/constants'

export default class LessonHoursDis extends React.Component {
    render() {
        return (
            <div className='section' style={{backgroundColor: colorsMap['B02']}} >
                课时各学科分布
                {_.map([1,2], v => <span key={v}>{v}</span>)}
            </div>
        )
    }
}