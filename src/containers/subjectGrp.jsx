import React from 'react';

import Header from '../components/subjectGrp/header';
import SubjectGrpCount from '../components/subjectGrp/subjectGrpCount';
import SubjectGrpCompare from '../components/subjectGrp/subjectGrpCompare';
import SubjectGrpFreedom from '../components/subjectGrp/subjectGrpFreedom';
import SubjectGrpDetail from '../components/subjectGrp/subjectGrpDetail';
import FloatToggle from '../commonComponents/float-toggle';

import { formatOptions } from '../lib/util';
import mockData from '../mockData/subjectGrp.json';

export default class SelectedSubjects extends React.Component {
    constructor(props) {
        super(props);
        const { info } = mockData;
        this.dimensions = [
            { value: 'triple', label: '选科组合（三科）' },
            { value: 'double', label: '选科组合（两科）' },
            { value: 'single', label: '选科组合（单科）' },
            { value: 'schoolsCompare', label: '各校选科数据对比' }
        ];
        this.periodOptions = formatOptions(info.periods);
        this.gradeOptions = formatOptions(info.grades)
        this.state = {
            currentDimension: this.dimensions[0],
            currentPeriod: this.periodOptions[0],
            currentGrade: this.gradeOptions[0]
        }
    }

    handleSelect(dimension) {
        this.setState({ currentDimension: dimension })
    }

    selectPeriod(period) {
        this.setState({ currentPeriod: period })
    }

    selectGrade(grade) {
        this.setState({ currentGrade: grade })
    }

    render() {
        const targetData = mockData[this.state.currentDimension.value].find(item => item.period===this.state.currentPeriod.label && item.grade===this.state.currentGrade.label)
        return (
            <div className='report' >
                <FloatToggle options={this.dimensions} handleSelect={this.handleSelect.bind(this)} />
                <Header
                    info={mockData.info}
                    periodOptions={this.periodOptions}
                    gradeOptions={this.gradeOptions}
                    selectPeriod={this.selectPeriod.bind(this)}
                    selectGrade={this.selectGrade.bind(this)}
                />
                <SubjectGrpCount targetData={targetData} />
                <SubjectGrpCompare targetData={targetData} />
                <SubjectGrpFreedom targetData={targetData} />
                <SubjectGrpDetail targetData={targetData} />
            </div>
        )
    }
}