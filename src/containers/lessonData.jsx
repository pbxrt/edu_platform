import React from 'react';

export default class LessonData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        var { location } = this.props;
        return (
            <div className='report' >
                <h1>LessonData</h1>
            </div>
        )
    }
}