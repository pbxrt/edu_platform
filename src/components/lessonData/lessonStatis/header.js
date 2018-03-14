import React from 'react';

import Select from '../../../commonComponents/select';
import { formatOptions } from '../../../lib/util';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.periodOptions = formatOptions(this.props.info.periods);
        this.gradeOptions = formatOptions(this.props.info.grades);
        this.state = {
            grade: this.gradeOptions[0]
        }
    }

    selectGrade(grade) {
        this.setState({ grade })
        this.props.selectGrade(grade)
    }

    selectPeriod(period) {
        this.props.selectPeriod(period)
    }

    render() {
        return (
            <header className='section' style={{ paddingTop: 45, paddingBottom: 0 }} >
                <div style={{ textAlign: 'center', fontSize: 24, paddingRight: 165 }} >{this.props.info.city}{this.state.grade.label}课时数据统计</div>
                <div style={{ paddingTop: 18, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }} >
                    <div className='section-title' style={{ flex: 1 }} >课时数据统计</div>
                    <div style={{ display: 'inline-block' }} >
                        <Select
                            options={this.periodOptions}
                            handleSelect={this.selectPeriod.bind(this)}
                        />
                    </div>
                    <div style={{ display: 'inline-block', marginLeft: 10 }} >
                        <Select
                            options={this.gradeOptions}
                            handleSelect={this.selectGrade.bind(this)}
                        />
                    </div>
                </div>
            </header>
        )
    }
}