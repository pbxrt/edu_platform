import React from 'react'

export default class BiToggler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            option: this.props.options[0]
        }
    }

    handleToggle(option) {
        this.setState({ option })
    }

    render() {
        return (
            <div style={{ display: 'inline-block', height: 38, borderRadius: 19, border: '2px solid #0860cc' }} >
                { this.props.options.map((option, index) => (
                    <div key={index}
                        onClick={this.handleToggle.bind(this, option)}
                        style={{ display: 'inline-block', borderRadius: 15, padding: '0 21px', height: 34, lineHeight: '34px', fontSize: 14, color: '#fff', backgroundColor: (this.state.option===option) ? '#0860cc' : 'transparent', cursor: 'pointer' }}
                    >{option.label}</div>
                ))}
            </div>
        )
    }
}