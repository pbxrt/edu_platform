import React from 'react';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    handleSearch() {
        console.log(this.state.text);
    }

    handleOnChange(event) {
        this.setState({
            text: event.nativeEvent.target.value
        })
    }

    render() {
        return (
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <input style={{width: 400, padding: 12}} type='text' value={this.state.text} onChange={this.handleOnChange.bind(this)} placeholder='搜索：区县 学校 老师' />
                <button onClick={this.handleSearch.bind(this)}>搜索</button>
            </div>
        )
    }
}