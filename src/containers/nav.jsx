import React from 'react';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';
import { links, colorsMap } from '../shared/constants';

const nav = () => (
    <nav style={{ height: 91, backgroundColor: colorsMap['B01'], display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 14 }}>
        {
            _.map(links, link => (    
                <NavLink exact key={link.route} to={link.route} style={{ padding: '0 10px', textDecoration: 'none', color: '#a8c9f0' }} activeStyle={{ color: '#FFF' }} >{link.label}</NavLink>
            ))
        }
    </nav>
);

export default nav;