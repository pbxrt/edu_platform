import React from 'react';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';

import { links, colorsMap } from '../shared/constants';
import user_icon from '../images/user.png';

const showLinks = links.filter(link => link.label !== '添加更多');

const nav = ({ city }) => (
    <nav style={{ height: 88, backgroundColor: colorsMap['B01'], display: 'flex', justifyContent: 'flex-start', alignItems: 'center', fontSize: 16 }}>
        <div style={{ padding: '0 30px 0 30px'}} >
            <div className='yx-logo' style ={{ width: 163, height: 41}} />
        </div>
        <div style={{ flex: 1 }} >
            {
                _.map(showLinks, link => (
                    <NavLink exact key={link.route} to={link.route} style={{ padding: '0 10px', textDecoration: 'none', color: '#a8c9f0' }} activeStyle={{ color: '#FFF' }} >{link.label}</NavLink>
                ))
            }
        </div>
        <div style={{ verticalAlign: 'middle', paddingRight: 30 }} >
            <img src={user_icon} alt='user_icon' style={{ height: 40 }} />
            <span style={{ paddingLeft: 10, cursor: 'pointer' }} >{city}教育局</span>
        </div>
    </nav>
);

export default nav;