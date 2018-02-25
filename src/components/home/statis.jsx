import React from 'react';

const Item = ({ count, text }) => (
    <div style={{textAlign: 'center'}}>
        <div style={{fontSize: 30}} >{count}</div>
        <div style={{fontSize: 12}} >{text}</div>
    </div>
);

const Statis = ({ districts, papers, schools }) => (
    <div style={{display: 'flex', justifyContent: 'space-between'}} >
        <Item count={districts} text={'区县数'} />
        <Item count={papers} text={'试卷数'} />
        <Item count={schools} text={'学校数'} />
    </div>
);

export default Statis;