import React from 'react';

import Select from '../../../commonComponents/select';
import Search from '../../../commonComponents/search';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            currentPeriod: this.props.periodOptions[0],
            currentSubject: this.props.subjectOptions[0],
            currentSchool: this.props.schoolOptions[0]
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props !== nextProps) {
            this.setState({
                text: ''
            })
        }
    }

    selectSchool(school) {
        this.props.selectSchool(school);
        this.setState({
            currentSchool: school
        })
    }

    selectPeriod(period) {
        this.props.selectPeriod(period)
        this.setState({
            currentPeriod: period
        })
    }

    selectSubject(subject) {
        this.props.selectSubject(subject);
        this.setState({
            currentSubject: subject
        })
    }

    render() {
        return (
            <header style={{ padding: '0 0 26px 0', textAlign: 'center' }} >
                <div style={{ paddingRight: 165 }} >
                    <div style={{ fontSize: 24, paddingBottom: 26 }} >{this.props.city}课程详细数据</div>
                    <Search
                        useFor='search-basic-info'
                        handleSearch={this.props.handleSearch.bind(this)}
                        placeholder={'输入学校、老师搜索'}
                        width={260}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: 26 }} >
                    <span style={{ fontSize: 14, paddingRight: 10 }} >选择学校</span>
                    <Select
                        options={this.props.schoolOptions}
                        handleSelect={this.selectSchool.bind(this)}
                    />
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', paddingRight: 10 }} >
                        <Select
                            options={this.props.periodOptions}
                            handleSelect={this.selectPeriod.bind(this)}
                        />
                    </div>
                    <Select
                        options={this.props.subjectOptions}
                        handleSelect={this.selectSubject.bind(this)}
                    />
                </div>
            </header>
        )
    }
}