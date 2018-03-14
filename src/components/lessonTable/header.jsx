import React from 'react';

import Search from '../../commonComponents/search';
import Select from '../../commonComponents/select';

export default class Header extends React.Component {
    render() {
        const { city } = this.props;
        return (
            <header style={{ width: 1155, padding: '45px 0', margin: '0 auto'}} >
                <div style={{ textAlign: 'center', fontSize: 24 }} >{city}课表查询</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 18 }} >
                    <Search
                        useFor='search-lesson-table'
                        handleSearch={this.props.handleSearch.bind(this)}
                        placeholder={'搜索：学校'}
                        color={'#fff'}
                        width={260}
                        border={'1px solid #888db3'}
                        backgroundColor={'transparent'}
                    />
                    <Select placeholder={'选择报告...'}
                        options={this.props.periodOptions}
                        handleSelect={this.props.selectPeriod.bind(this)}
                    />
                </div>
            </header>
        )
    }
}
