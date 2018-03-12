import React from 'react';
import arrow from '../images/arrow_down.png';
import { colorsMap } from '../shared/constants';

export default class Select extends React.Component {
    constructor(props) {
        super(props)
        this.options = this.props.options
        this.state = {
            isFocused: false,
            value: this.options[0]
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.options !== nextProps.options) {
            this.options = nextProps.options;
            this.setState({
                isFocused: false,
                value: this.options[0]
            })
        }
    }

    handleFocus() {
        this.setState({ isFocused: true })
    }

    handleBlur() {
        this.setState({ isFocused: false })
    }

    handleSelect(option) {
        this.props.handleSelect(option)
        this.setState({
            value: option
        })
    }

    render() {
        return (
            <div style={{ position: 'relative', verticalAlign: 'middle', textAlign: 'left' }} >
                <input use-for='select'
                    style={{
                        height: 32,
                        paddingLeft: 10,
                        backgroundColor: colorsMap['B03'],
                        border: `2px solid ${colorsMap['T02']}`,
                        borderRadius: 3,
                        outline: 'none',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        paddingRight: 20,
                        width: this.props.width || 196
                    }}
                    placeholder={this.props.placeholder}
                    type='text'
                    value={this.state.value.label}
                    onFocus={this.handleFocus.bind(this)}
                    onBlur={this.handleBlur.bind(this)}
                    readOnly
                />
                <img src={arrow} alt='search_icon' style={{ position: 'absolute', left: this.props.width ? this.props.width-30 : 166, top: 10, transform: `rotate(${this.state.isFocused ? 180 : 0}deg)`, width: 17, height: 9}}  />
                { this.state.isFocused && (
                    <div style={{ backgroundColor: colorsMap['B03'], border: `1px solid ${colorsMap['T02']}`, position: 'absolute', zIndex: 10, width: this.props.width || 196 , height: 200, overflow: 'auto' }} >
                        {this.options.map(list => (
                            <div key={list.value}
                                className={this.props.itemClassName}
                                onMouseDown={this.handleSelect.bind(this, list)}
                                style={{ color: '#fff', padding: '5px 0 5px 10px', cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {list.label}
                            </div>
                        ))}
                    </div>
                ) }
            </div>
        )
    }
}
