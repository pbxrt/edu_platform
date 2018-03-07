import React from 'react';

export default class FloatToggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            option: this.props.options[0]
        }
    }

    handleClick(option) {
        this.setState({ option })
        this.props.handleSelect(option)
    }

    render() {
        return (
            <div style={{ width: 136, borderRadius: 2, position: 'fixed', left: 'calc(50% - 660px)', top: 300, backgroundColor: '#1335a9' }} >
                {
                    this.props.options.map(option => {
                        var isActive = option===this.state.option;
                        var bgColor = isActive ? '#0c4dbc' : 'transparent';
                        var borderRadius = isActive ? 2 : 0;
                        var color = isActive ? '#FFF' : '#82a1d5';
                        return (
                            <div key={option.value}
                                style={{padding: '12px 0 12px 12px', fontSize: 14, color, backgroundColor: bgColor, borderRadius, cursor: 'pointer' }}
                                onClick={this.handleClick.bind(this, option)}
                            >{option.label}</div>
                        )
                    })
                }
            </div>
        )
    }
}