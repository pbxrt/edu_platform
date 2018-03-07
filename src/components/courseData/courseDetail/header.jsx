import React from 'react';

import Select from '../../../commonComponents/select';
import Search from '../../../commonComponents/search';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            period: this.props.periodOptions[0],
            subject: this.props.subjectOptions[0]
        }
    }

    handleSearch(text) {
        console.log('search text : ', text)
    }

    selectSchool(school) {
        console.log('school ===>', school)
        this.props.selectSchool(school)
    }

    selectPeriod(period) {
        this.setState({ period })
    }

    selectSubject(subject) {
        this.setState({ subject })
    }

    render() {
        return (
            <header style={{ padding: '0 0 26px 0', textAlign: 'center' }} >
                <div style={{ paddingRight: 165 }} >
                    <div style={{ fontSize: 24, paddingBottom: 26 }} >{this.props.city}课时详细数据</div>
                    <Search
                        useFor='search-basic-info'
                        handleSearch={this.handleSearch.bind(this)}
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