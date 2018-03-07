import React from 'react';

import ReportSelector from '../components/subjectGrp/reportSelector';
import SubjectGrpCount from '../components/subjectGrp/subjectGrpCount';
import SubjectGrpCompare from '../components/subjectGrp/subjectGrpCompare';
import SubjectGrpFreedom from '../components/subjectGrp/subjectGrpFreedom';
import SubjectGrpDetail from '../components/subjectGrp/subjectGrpDetail';
import FloatToggle from '../commonComponents/float-toggle';

const options = [
    { value: '选科组合（三科）', label: '选科组合（三科）' },
    { value: '选科组合（两科）', label: '选科组合（两科）' },
    { value: '选科组合（单科）', label: '选科组合（单科）' },
    { value: '各校选科数据对比', label: '各校选科数据对比' }
]

export default class SelectedSubjects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleSelect(option) {
        console.log('option --->', option)
    }

    render() {
        var reportList = [{ id: '111', name: '2017~2018学年高一选科组合分析报告'}];
        return (
            <div className='report' >
                <FloatToggle options={options} handleSelect={this.handleSelect.bind(this)} />
                <ReportSelector reportList={reportList} />
                <SubjectGrpCount />
                <SubjectGrpCompare />
                <SubjectGrpFreedom />
                <SubjectGrpDetail />
            </div>
        )
    }
}