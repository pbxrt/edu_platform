import React from 'react'

export default class SearchBox extends React.Component {
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
            <input
                use-for={this.props.useFor}
                style={this.props.style}
                placeholder={this.props.placeholder}
                type='text'
                value={this.state.text}
                onChange={this.handleOnChange.bind(this)}
                onBlur={this.handleOnBlur.bind(this)}
            />
        )
    }
}