import React from 'react';

import Select from '../../commonComponents/select';

export default class DistrictHeader extends React.Component {
    render() {
        return (
            <div className='section' style={{ paddingTop: 45, paddingBottom: 0 }} >
                <div style={{ textAlign: 'center', paddingRight: 165, paddingBottom: 40, fontSize: 24 }} >{this.props.info.city}选科组合分析报告</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 0, alignItems: 'center' }} >
                    <span className='section-title' >选科组合分析：</span>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', paddingRight: 10 }} >
                        <Select
                            options={this.props.periodOptions}
                            handleSelect={this.props.selectPeriod.bind(this)}
                        />
                    </div>
                    <div >
                        <Select
                            options={this.props.gradeOptions}
                            handleSelect={this.props.selectGrade.bind(this)}
                            width={90}
                        />
                    </div>
                </div>
            </div>
        )
    }
}