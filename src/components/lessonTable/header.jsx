import React from 'react';

import Search from '../../commonComponents/search';
import Select from '../../commonComponents/select';
import { colorsMap } from '../../shared/constants';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.options = [
            { value: '2017-2018学年上学期', label: '2017-2018学年上学期' },
            { value: '2017-2018学年上学期1', label: '2017-2018学年上学期1' },
            { value: '2017-2018学年上学期2', label: '2017-2018学年上学期2' },
            { value: '2017-2018学年上学期3', label: '2017-2018学年上学期3' }
        ];
        this.state = {
            searchText: '',
            value: ''
        }
    }

    handleChange(option) {
        console.log('=============>', option)
    }

    handleSearch(text) {
        console.log('search text is ', text)
    }

    render() {
        const { city } = this.props;
        return (
            <header style={{ width: 1155, height: 110, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} >
                <div style={{ flex: 1 }} >
                    <Search
                        useFor='search-lesson-table'
                        handleSearch={this.handleSearch.bind(this)}
                        placeholder={'搜索：学校'}
                        color={'#fff'}
                        width={260}
                        border={'1px solid #888db3'}
                        backgroundColor={'transparent'}
                    />
                </div>
                
                <div style={{ flex: 1, textAlign: 'center', fontSize: 20 }} >{city}课表查询</div>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }} >
                <Select placeholder={'选择报告...'}
                    options={this.options}
                    handleSelect={this.handleChange.bind(this)}
                    inputStyle={{ width: 208, height: 32, paddingLeft: 10, backgroundColor: colorsMap['B03'], border: `2px solid ${colorsMap['T02']}`, borderRadius: 3 }}
                    dropDownStyle={{ backgroundColor: colorsMap['B03'], border: `1px solid ${colorsMap['T02']}`, paddingLeft: 10 }}
                    itemStyle={{ color: '#fff', padding: '5px 0 5px 5px' }}
                />
                </div>
            </header>
        )
    }
}
