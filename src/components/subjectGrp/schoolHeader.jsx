import React from 'react';

import Select from '../../commonComponents/select';

export default class SchoolHeader extends React.Component {
    render() {
        return (
            <div className='section' style={{ paddingTop: 45, paddingBottom: 0 }} >
                <div style={{ textAlign: 'center', paddingRight: 165, paddingBottom: 40, fontSize: 24 }} >{this.props.currentSchool.label}选科组合分析报告</div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: 0, alignItems: 'center' }} >
                    <span className='section-title' style={{ flex:1}} >选科组合分析：</span>
                    <div style={{ display: 'inline-block', paddingRight: 10 }} >
                        <Select
                            options={this.props.schoolOptions}
                            handleSelect={this.props.selectSchool.bind(this)}
                        />
                    </div>
                    <div style={{ display: 'inline-block', paddingRight: 10 }} >
                        <Select
                            options={this.props.periodOptions}
                            handleSelect={this.props.selectPeriod.bind(this)}
                        />
                    </div>
                    <div style={{ display: 'inline-block', paddingRight: 10 }} >
                        <Select
                            options={this.props.gradeOptions}
                            handleSelect={this.props.selectGrade.bind(this)}
                            width={90}
                        />
                    </div>
                    <div style={{ display: 'inline-block' }} >
                        <Select
                            options={this.props.subjectGrpOptions}
                            handleSelect={this.props.selectSubjectGrp.bind(this)}
                            width={90}
                        />
                    </div>
                </div>
            </div>
        )
    }
}