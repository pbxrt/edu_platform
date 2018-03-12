import React from 'react';

import Header from './header';
import TotalStatis from './totalStatis';
import CourseDis from './courseDis';
import AreaDetail from './areaDetail';
import SchoolDetail from './schoolDetail';
import { formatOptions } from '../../../lib/util';

export default class CourseStatis extends React.Component {
    constructor(props) {
        super(props);
        const { data } = this.props;
        this.periodOptions = formatOptions(data.periods);
        this.gradeOptions = formatOptions(data.grades);
        this.state = {
            currentPeriod: this.periodOptions[0],
            currentGrade: this.gradeOptions[0]
        }
    }

    selectPeriod(period) {
        this.setState({
            currentPeriod: period
        })
    }

    selectGrade(grade) {
        this.setState({
            currentGrade: grade
        })
    }

    render() {
        const statis = this.props.data.statis.find(item => (item.period === this.state.currentPeriod.value) && (item.grade === this.state.currentGrade.value))
        return (
            <div>
                <Header
                    periodOptions={this.periodOptions}
                    gradeOptions={this.gradeOptions}
                    selectPeriod={this.selectPeriod.bind(this)}
                    selectGrade={this.selectGrade.bind(this)}
                />
                <TotalStatis statis={statis} />
                <CourseDis statis={statis} />
                <AreaDetail statis={statis} />
                <SchoolDetail statis={statis} />
            </div>
        )
    }
}