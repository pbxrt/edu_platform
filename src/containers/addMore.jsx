import React from 'react';

export default class AddMore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        var { location } = this.props;
        return (
            <div className='report' >
                <h1>AddMore</h1>
            </div>
        )
    }
}