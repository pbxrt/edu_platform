import React from 'react';

export default class Curriculumn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        var { location } = this.props;
        return (
            <div className='report' >
                <h1>Curriculumn</h1>
            </div>
        )
    }
}