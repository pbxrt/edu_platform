import React from 'react';

export default class EduResourceDis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        var { location } = this.props;
        return (
            <div className='report' >
                <h1>EduResourceDis</h1>
            </div>
        )
    }
}