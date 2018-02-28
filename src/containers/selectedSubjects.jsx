import React from 'react';

export default class SelectedSubjects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        var { location } = this.props;
        return (
            <div className='report' >
                <h1>SelectedSubjects</h1>
            </div>
        )
    }
}