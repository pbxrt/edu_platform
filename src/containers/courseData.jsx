import React from 'react';

export default class CourseData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        var { location } = this.props;
        return (
            <div className='report' >
                <h1>CourseData</h1>
            </div>
        )
    }
}