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
                <div style={{width: 1230, display: 'flex', alignItems: 'center', height: 'calc(100% - 620px)', margin: '0 auto', paddingBottom: 30}} >
                    <Statis districts={13} papers={828374273} schools={168} />
                </div>
                <div className='cards' style={{width: 1234, height: 400, display: 'flex', margin: '0 auto', flexFlow: 'row wrap', justifyContent: 'space-between', alignItems: 'space-between'}} >
                    {
                        _.map(cards, link => (
                            <div key={link.route} style={{width: 294, height: 191, marginBottom: 18, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
                                <Link to={link.route} style={{color: '#FFF', marginBottom: 10, textDecoration: 'none', fontSize: 14}} >{link.label}</Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        )    
    }
}

export default withRouter(Home);