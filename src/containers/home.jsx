import React from 'react';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';
import { links } from '../shared/constants';

const cards = links.filter(link => link.route !== '/');
const Home = () => {
    return (
        <div>
            <h1>Home</h1>
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
};

export default Home;