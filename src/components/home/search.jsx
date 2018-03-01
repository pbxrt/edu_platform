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
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: 700, height: 40}} >
                    <i className='magnifier' />
                    <input style={{ width: '100%', height: '100%', paddingLeft: 40, fontSize: 14, border: 'none', borderRadius: 3 }} type='text' value={this.state.text} onChange={this.handleOnChange.bind(this)} placeholder='搜索：区县、学校、老师' />
                </div>
                <button style={{ marginLeft: 20, height: 40, padding: '0 30px', fontSize: 14, background: '#17aaf7', border: 'none', borderRadius: 3, color: '#FFF', cursor: 'pointer' }} onClick={this.handleSearch.bind(this)}>搜索</button>
            </div>
        )
    }
}