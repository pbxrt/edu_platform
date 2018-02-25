import React from 'react';
import Nav from '../commonComponents/nav';

export default class BasicInfo extends React.Component {
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
                <h1>BasicInfo</h1>
            </div>
        )
    }
}