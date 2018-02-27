import React from 'react';

const Item = ({ count, text }) => (
    <div>
        <div className='number' style={{fontSize: 50}} >{count.toLocaleString()}</div>
        <div style={{fontSize: 16}} >{text}</div>
    </div>
);

const Statis = ({ districts, papers, schools }) => (
    <div style={{display: 'flex', justifyContent: 'space-between', flex: 1}} >
        <Item count={districts} text={'区县数'} />
        <Item count={papers} text={'试卷数'} />
        <Item count={schools} text={'学校数'} />
    </div>
);

export default Statis;