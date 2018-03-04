import React from 'react';

import { colorsMap } from '../../shared/constants';
import arrow_left from '../../images/arrow_left.png';
import arrow_right from '../../images/arrow_right.png';

export default class ReportSelector extends React.Component {
    constructor(props) {
        super(props);
        var { reportList } = this.props;
        this.state = {
            currentReport: reportList[0]
        }
    }

    handleOnClick(direction) {
        console.log('you clicked ', direction);
    }

    render() {
        return (
            <div style={{backgroundColor: colorsMap['B02']}} >
                <div style={{width: 1320, height: 60, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} >
                    <img src={arrow_left} style={{ width: 11, height: 20, cursor: 'pointer' }} alt='arrow_left' onClick={this.handleOnClick.bind(this, 'left')} />
                    <span>{this.state.currentReport.name}</span>
                    <img src={arrow_right} style={{ width: 11, height: 20, cursor: 'pointer' }} alt='arrow_right' onClick={this.handleOnClick.bind(this, 'right')} />
                </div>
            </div>
        )
    }
}