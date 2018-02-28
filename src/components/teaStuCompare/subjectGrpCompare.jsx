import React from 'react';
import { colorsMap } from '../../shared/constants';

export default class SubjectGrpCompare extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className='section' style={{backgroundColor: colorsMap['B02']}} >
                <div style={{ width: 1230, paddingLeft: 165, margin: '0 auto' }} >
                    <div style={{ height: 400, backgroundColor: '#ccc' }} ></div>
                </div>
            </div>
        )
    }
}