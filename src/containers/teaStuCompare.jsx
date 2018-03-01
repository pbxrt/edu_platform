import React from 'react';

import ReportSelector from '../components/teaStuCompare/reportSelector';
import SubjectGrpCount from '../components/teaStuCompare/subjectGrpCount';
import SubjectGrpCompare from '../components/teaStuCompare/subjectGrpCompare';
import SubjectGrpFreedom from '../components/teaStuCompare/subjectGrpFreedom';
import SubjectGrpDetail from '../components/teaStuCompare/subjectGrpDetail';
import SubjectGrpSelector from '../components/teaStuCompare/subjectGrpSelector';

export default class TeaStuCompare extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        var { location } = this.props;
        console.log(location)
        var reportList = [{ id: '111', name: '2017~2018学年高一选科组合分析报告'}];
        return (
            <div className='report' >
                <SubjectGrpSelector />
                <ReportSelector reportList={reportList} />
                <SubjectGrpCount />
                <SubjectGrpCompare />
                <SubjectGrpFreedom />
                <SubjectGrpDetail />
            </div>
        )
    }
}