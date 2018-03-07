import React from 'react'

export default class ToggleDimension extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            option: this.props.options[0]
        }
    }

    handleClick(option) {
        this.setState({ option });
        this.props.handleClick(option)
    }

    render() {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }} >
                { this.props.options.map((option, index) => (
                    <span
                        key={option.value}
                        onClick={this.handleClick.bind(this, option)}
                        style={{
                            padding: '0 9px',
                            cursor: 'pointer',
                            color: (this.state.option === option) ? '#e9df5a' : '#fff',
                            borderRight: this.props.options[index+1] ? '3px solid #fff': '3px solid transparent'
                    }} >{option.label}</span>
                ))}
            </div>
        )
    }
}