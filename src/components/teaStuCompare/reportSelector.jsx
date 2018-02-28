import React from 'react';
import { colorsMap } from '../../shared/constants';

export default class ReportSelector extends React.Component {
    constructor(props) {
        super(props);
        var { reportList } = this.props;
        this.state = {
            currentReport: reportList[0]
        }
    }

    render() {
        return (
            <div style={{backgroundColor: colorsMap['B02']}} >
                <div style={{width: 1230, height: 76, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} >
                    <span>{'<'}</span>
                    <span>{this.state.currentReport.name}</span>
                    <span>{'>'}</span>
                </div>
            </div>
        )
    }
}