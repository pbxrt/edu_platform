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
                <input style={{width: 700, height: 40, fontSize: 13, paddingLeft: 28, border: 'none', borderRadius: 3}} type='text' value={this.state.text} onChange={this.handleOnChange.bind(this)} placeholder='🔍 搜索：区县、学校、老师' />
                <button style={{marginLeft: 20, height: 40, padding: '0 30px', background: '#17aaf7', border: 'none', borderRadius: 3, color: '#FFF'}} onClick={this.handleSearch.bind(this)}>搜索</button>
            </div>
        )
    }
}