import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { links } from '../shared/constants';

const nav = ({ location }) => (
    <nav style={{display: 'flex', justifyContent: 'center'}} >
        {
            _.map(links, link => (
                <Link key={link.route} to={link.route} style={{padding: '0 10px', textDecoration: 'none', color: (location.pathname === link.route) ? 'limegreen' : 'black'}} >{link.label}</Link>
            ))
        }
    </nav>
);

export default nav;