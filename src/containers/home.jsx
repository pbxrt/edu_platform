import React from 'react';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';

import Header from '../components/home/header';
import Search from '../components/home/search';
import Statis from '../components/home/statis';
import { links } from '../shared/constants';

const cards = links.filter(link => link.route !== '/');

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    logOut() {
        console.log('logOut')
    }

    render() {
        return (
            <div>
                <Header city={'宁德市'} logOut={this.logOut.bind(this)} />
                <Search />
                <div style={{width: 860, margin: '50px auto'}} >
                    <Statis districts={13} papers={828374273} schools={168} />
                </div>
                <div style={{width: 860, display: 'flex', margin: '0 auto', flexFlow: 'row wrap', justifyContent: 'space-between'}} >
                    {
                        _.map(cards, link => (
                            <div key={link.route} style={{width: 200, height: 150, border: '1px solid'}}>
                                <NavLink to={link.route} >{link.label}</NavLink>
                            </div>
                        ))
                    }
                </div>
            </div>
        )    
    }
}
