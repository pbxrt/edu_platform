import React from 'react';

import Select from '../../commonComponents/selector';
import { colorsMap } from '../../shared/constants';

class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    handleOnChange(event) {
        this.setState({ text: event.nativeEvent.target.value })
    }

    handleOnBlur(event) {
        console.log(event.nativeEvent.target.value)
    }

    render() {
        return (
            <input
                style={{ width: 208, height: 38, paddingLeft: 14, border: `2px solid ${colorsMap['T02']}`, borderRadius: 3, color: '#FFF', backgroundColor: colorsMap['B03'] }}
                type='text'
                placeholder='搜索：学校'
                value={this.state.text}
                onChange={this.handleOnChange.bind(this)}
                onBlur={this.handleOnBlur.bind(this)}
            />
        )
    }
}

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.options = [
            { value: 'one', label: 'one' },
            { value: 'two', label: 'two' },
            { value: 'three', label: 'three' },
            { value: 'four', label: 'four' }
        ];
        this.state = {
            searchText: '',
            value: ''
        }
    }

    handleChange(option) {

        if(option) {
            this.setState({
                value: option.value
            })
        } else {
            this.setState({ value: '' })
        }
    }

    render() {
        setInterval(() => {
            var outer = document.getElementsByClassName('Select-menu-outer')[0];
            if(outer) {

                console.log(outer.innerHTML)
            }
        }, 1000)
        const { city } = this.props;
        return (
            <header style={{ width: 1155, height: 110, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} >
                <div style={{ flex: 1}} >
                    <SearchBox />
                </div>
                <div style={{ flex: 1, textAlign: 'center', fontSize: 20 }} >{city}课表查询</div>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }} >
                    <div style={{width: 208, height: 38}} >
                        <Select name='form-field-name'
                            style={{ border: `2px solid ${colorsMap['T02']}`, borderRadius: 3, backgroundColor: colorsMap['B03']}}
                            value={this.state.value}
                            options={this.options}
                            onChange={this.handleChange.bind(this)}
                         />
                    </div>
                </div>
            </header>
        )
    }
}