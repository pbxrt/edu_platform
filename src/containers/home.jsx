import React from 'react';
import _ from 'lodash';
import { Link, withRouter } from 'react-router-dom';

import Header from '../components/home/header';
import Search from '../components/home/search';
import Statis from '../components/home/statis';
import { links } from '../shared/constants';
import '../styles/home.css';

const cards = links.filter(link => link.route !== '/');

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    logOut() {
        console.log('logOut')
    }

    onTest() {
        this.props.history.push('/course/data')
    }

    render() {
        return (
            <div className='home'>
                <Header city={'宁德市'} logOut={this.logOut.bind(this)} />
                <Search />
                <div style={{width: 1320, margin: '50px auto'}} >
                    <Statis districts={13} papers={828374273} schools={168} />
                </div>
                <div className='cards' style={{width: 1320, display: 'flex', margin: '0 auto', flexFlow: 'row wrap', justifyContent: 'space-between'}} >
                    {
                        _.map(cards, link => (
                            <div key={link.route} style={{width: 316, height: 216, marginBottom: 20}}>
                                <Link to={link.route} >{link.label}</Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        )    
    }
}

export default withRouter(Home);