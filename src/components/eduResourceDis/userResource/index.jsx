import React from 'react';

import Header from '../header';
import TotalStatis from '../totalStatis';
import AreaStatis from '../areaStatis';
import GenderCompare from './genderCompare';
import AreaDetail from './areaDetail';
import SchoolDetail from './schoolDetail';

export default class UserResource extends React.Component {
    constructor(props) {
        super(props);
        const { data } = this.props;
        this.state = {
            currentPeriod: data.info.periods[0],
            currentGrade: data.info.grades[0]
        }
    }

    selectPeriod(period) {
        this.setState({ currentPeriod: period.label })
    }

    selectGrade(grade) {
        this.setState({ currentGrade: grade.label })
    }

    render() {
        const { data } = this.props;
        const { info, user:userStatis } = data;
        const targetData = userStatis.find(item => item.period===this.state.currentPeriod && item.grade===this.state.currentGrade);
        return (
            <div>
                <Header
                    info={info}
                    title={'用户资源分布'}
                    subTitle={'区域数据统计'}
                    selectPeriod={this.selectPeriod.bind(this)}
                    selectGrade={this.selectGrade.bind(this)}
                />
                <TotalStatis targetData={targetData} type='user' />
                <AreaStatis targetData={targetData} />
                <GenderCompare targetData={targetData} />
                <AreaDetail targetData={targetData} />
                <SchoolDetail targetData={targetData} />
            </div>
        )
    }
}