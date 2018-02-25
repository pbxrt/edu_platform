import React from 'react';
import Nav from '../commonComponents/nav';

export default class Curriculumn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        var { location } = this.props;
        return (
            <div>
                <Nav location={location} />
                <h1>Curriculumn</h1>
            </div>
        )
    }
}