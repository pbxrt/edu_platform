import React from 'react';

import FloatToggle from '../commonComponents/float-toggle';
import UserResource from '../components/eduResourceDis/userResource';
import AssetResource from '../components/eduResourceDis/assetResource';

const options = [
    { value: '用户资源', label: '用户资源' },
    { value: '资产资源', label: '资产资源' }
];

export default class EduResourceDis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            option: options[0]
        }
    }

    handleSelect(option) {
        this.setState({ option })
    }

    render() {
        return (
            <div className='report' >
                <FloatToggle options={options} handleSelect={this.handleSelect.bind(this)} />
                { this.state.option.value==='用户资源' ? <UserResource /> : null }
                { this.state.option.value==='资产资源' ? <AssetResource /> : null }
            </div>
        )
    }
}