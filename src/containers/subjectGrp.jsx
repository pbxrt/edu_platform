import React from 'react';

import DistrictHeader from '../components/subjectGrp/districtHeader';
import SchoolHeader from '../components/subjectGrp/schoolHeader';
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
        this.gradeOptions = formatOptions(info.grades);
        this.schoolOptions = formatOptions(info.schools);
        this.subjectGrpOptions = formatOptions(info.subjectGrps)
        this.state = {
            currentDimension: this.dimensions[0], // 在区县之间切换三科两科单科
            currentPeriod: this.periodOptions[0],
            currentGrade: this.gradeOptions[0],
            currentSchool: this.schoolOptions[0],
            currentSubjectGrp: this.subjectGrpOptions[0] //在单个学校的维度切换三科、两科、单科
        }
    }

    selectDimension(dimension) {
        this.setState({ currentDimension: dimension })
    }

    selectPeriod(period) {
        this.setState({ currentPeriod: period })
    }

    selectGrade(grade) {
        this.setState({ currentGrade: grade })
    }

    selectSchool(school) {
        this.setState({ currentSchool: school })
    }

    selectSubjectGrp(subjectGrp) {
        this.setState({ currentSubjectGrp: subjectGrp })
    }

    render() {
        const { currentDimension, currentPeriod, currentGrade, currentSchool, currentSubjectGrp } = this.state;
        const targetData = getTargetData(mockData, currentDimension, currentPeriod, currentGrade, currentSchool, currentSubjectGrp)
        return (
            <div className='report' >
                <FloatToggle options={this.dimensions} handleSelect={this.selectDimension.bind(this)} />
                { this.state.currentDimension.value==='schoolsCompare' ? (
                    <SchoolHeader
                        currentSchool={this.state.currentSchool}
                        schoolOptions={this.schoolOptions}
                        periodOptions={this.periodOptions}
                        gradeOptions={this.gradeOptions}
                        subjectGrpOptions={this.subjectGrpOptions}
                        selectPeriod={this.selectPeriod.bind(this)}
                        selectGrade={this.selectGrade.bind(this)}
                        selectSchool={this.selectSchool.bind(this)}
                        selectSubjectGrp={this.selectSubjectGrp.bind(this)}
                    />
                ) : (
                    <DistrictHeader
                        info={mockData.info}
                        periodOptions={this.periodOptions}
                        gradeOptions={this.gradeOptions}
                        selectPeriod={this.selectPeriod.bind(this)}
                        selectGrade={this.selectGrade.bind(this)}
                    />
                )}
                <SubjectGrpCount targetData={targetData} />
                <SubjectGrpCompare targetData={targetData} />
                { currentDimension.value === 'triple' && <SubjectGrpFreedom targetData={targetData} /> }
                <SubjectGrpDetail currentDimension={currentDimension} targetData={targetData} />
            </div>
        )
    }
}

function getTargetData(mockData, currentDimension, currentPeriod, currentGrade, currentSchool, currentSubjectGrp) {
    let targetData;
    if(currentDimension.value === 'schoolsCompare') {
        let key =
            currentSubjectGrp.label==='三科' ? 'triple' :
            currentSubjectGrp.label==='两科' ? 'double' :
            'single';
        targetData = mockData[key].find(item => item.period===currentPeriod.label && item.school===currentSchool.label && item.grade===currentGrade.label)
    } else {
        targetData = mockData[currentDimension.value].find(item => !item.school && item.period===currentPeriod.label && item.grade===currentGrade.label)
    }
    return targetData;
}