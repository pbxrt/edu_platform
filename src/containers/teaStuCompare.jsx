import React from 'react';

import Header from '../components/teaStuCompare/header';
import CityCompare from '../components/teaStuCompare/cityCompare';
import DistrictCompare from '../components/teaStuCompare/districtCompare';
import SchoolCompare from '../components/teaStuCompare/schoolCompare';
import mockData from '../mockData/teaStu.json';

export default class TeaStuCompare extends React.Component {
    constructor(props) {
        super(props);
        this.info = mockData.info;
        this.state = {
            currentPeriod: this.info.periods[0],
            currentGrade: this.info.grades[0]
        }
    }

    selectPeriod(period) {
        this.setState({ currentPeriod: period.label })
    }

    selectGrade(grade) {
        this.setState({ currentGrade: grade.label })
    }

    render() {
        const targetData = mockData.statis.find(item => (item.period===this.state.currentPeriod) && (item.grade===this.state.currentGrade))
        return (
            <div className='report' >
                <Header
                    info={this.info}
                    title={'师生比例分析'}
                    subTitle={'师生有效比分布'}
                    selectPeriod={this.selectPeriod.bind(this)}
                    selectGrade={this.selectGrade.bind(this)}
                />
                <CityCompare info={this.info} targetData={targetData} />
                <DistrictCompare info={this.info} targetData={targetData} />
                <SchoolCompare info={this.info} targetData={targetData} />
            </div>
        )
    }
}