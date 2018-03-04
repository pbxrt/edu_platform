import React from 'react';
import arrow from '../images/arrow_down.png';

export default class Select extends React.Component {
    constructor(props) {
        super(props)
        this.options = this.props.options
        this.state = {
            isFocused: false,
            value: ''
        }
    }

    handleChange(event) {
        this.setState({ value: event.nativeEvent.target.value })
    }

    handleFocus() {
        this.setState({ isFocused: true })
    }

    handleBlur() {
        this.setState({ isFocused: false })
    }

    handleSelect(option) {
        this.setState({ value: option.label })
        this.props.handleSelect(option)
    }

    render() {
        return (
            <div style={Object.assign({}, this.props.inputStyle, { border: 'none', position: 'relative', padding: 0})} >
                <input use-for='select' style={Object.assign({}, this.props.inputStyle, { outline: 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: 20 })} placeholder={this.props.placeholder} type='text' value={this.state.value} onFocus={this.handleFocus.bind(this)} onBlur={this.handleBlur.bind(this)} />
                <img src={arrow} alt='search_icon' style={{ position: 'absolute', top: '50%', right: 10, transform: `translateY(-50%) rotate(${this.state.isFocused ? 180 : 0}deg)`, width: 17, height: 9}}  />
                { this.state.isFocused && (
                    <div style={Object.assign({}, this.props.dropDownStyle, { position: 'absolute', zIndex: 10, width: '100%', height: 200, overflow: 'auto' })} >
                        {this.options.map(list => (
                            <div key={list.value}
                                className={this.props.itemClassName}
                                onMouseDown={this.handleSelect.bind(this, list)}
                                style={Object.assign({}, this.props.itemStyle, { cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' })}>
                                {list.label}
                            </div>
                        ))}
                    </div>
                ) }
            </div>
        )
    }
}
