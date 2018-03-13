import React from 'react';

import Select from '../../../commonComponents/select';

export default class Header extends React.Component {
    render() {
        return (
            <div className='section'>
                <div style={{ textAlign: 'center', paddingRight: 165, paddingBottom: 40, fontSize: 22 }} >{this.props.city || '宁德市'}课程数据统计</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 0 }} >
                    <span className='section-title' >区域数据统计：</span>
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
                        />
                    </div>
                </div>
            </div>
        )
    }
}