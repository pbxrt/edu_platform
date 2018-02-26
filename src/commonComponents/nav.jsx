import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { links } from '../shared/constants';

const nav = ({ location }) => (
    <nav style={{height: 60, backgroundColor: '#0761cb', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 14}} >
        {
            _.map(links, link => (    
                <Link key={link.route} to={link.route} style={{padding: '0 10px', textDecoration: 'none', color: (location.pathname === link.route) ? '#FFF' : '#a8c9f0'}} >{link.label}</Link>
            ))
        }
    </nav>
);

export default nav;