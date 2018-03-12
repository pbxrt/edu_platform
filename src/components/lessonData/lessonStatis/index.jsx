import React from 'react';

import Header from './header';
import LessonHoursStatis from './lessonHoursStatis';
import LessonHoursDis from './lessonHoursDis';
import AreaDetail from './areaDetail';
import SchoolDetail from './schoolDetail';


export default class LessonStatis extends React.Component {
    constructor(props) {
        super(props);
        const { statis } = this.props;
        this.state = {
            currentPeriod: statis.info.periods[0],
            currentGrade: statis.info.grades[0]
        }
    }

    selectPeriod(period) {
        this.setState({ currentPeriod: period.label })
    }

    selectGrade(grade) {
        this.setState({ currentGrade: grade.label })
    }
    
    render() {
        const { statis } = this.props;
        const targetData = statis.items.find(item => item.period===this.state.currentPeriod && item.grade===this.state.currentGrade);
        return (
            <div >
                <Header
                    info={statis.info}
                    selectPeriod={this.selectPeriod.bind(this)}
                    selectGrade={this.selectGrade.bind(this)}
                />
                <LessonHoursStatis data={targetData} />
                <LessonHoursDis data={targetData} />
                <AreaDetail data={targetData} />
                <SchoolDetail data={targetData} />
            </div>
        )
    }
}
