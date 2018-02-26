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
            <div style={{height: '100vh', backgroundColor: '#101b66'}}>
                <Nav location={location} />
                <h1>BasicInfo</h1>
            </div>
        )
    }
}