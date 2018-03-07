import React from 'react'

import search from '../images/search.png'
import search_white from '../images/search-white.png'

export default class Search extends React.Component {
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
        this.props.handleSearch(this.state.text)
    }

    render() {
        return (
            <div style={{ position: 'relative', display: 'inline-block' }} >
                <img src={this.props.backgroundColor==='transparent' ? search_white : search} style={{ position: 'absolute', left: 10, top: 9, width: 16, height: 16 }} alt='search' />
                <input
                    use-for={this.props.useFor}
                    style={{
                        height: 32,
                        paddingLeft: 30,
                        border: this.props.border || 'none',
                        outline: 'none',
                        borderRadius: 16,
                        color: this.props.color || '#000',
                        backgroundColor: this.props.backgroundColor || '#fff',
                        width: this.props.width || 196,

                    }}
                    placeholder={this.props.placeholder}
                    type='text'
                    value={this.state.text}
                    onChange={this.handleOnChange.bind(this)}
                    onBlur={this.handleOnBlur.bind(this)}
                />
            </div>
        )
    }
}