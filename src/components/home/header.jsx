import React from 'react';

class Time extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: getTime()
        }
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({
                time: getTime()
            });
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return <span>{this.state.time}</span>
    }
}

const Header = ({ city, logOut }) => (
    <div style={{height: '16%', paddingLeft: '8vh', paddingRight: '8vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} >
        <div style={{flex: 1, textAlign: 'left'}} >
            <div className='yx-logo' style ={{ width: 163, height: 51}} />
        </div>
        <div style={{fontSize: 40, flex: 1}} >{city}</div>
        <div style={{flex: 1, display: 'flex', fontSize: 14, alignItems: 'center', justifyContent: 'flex-end'}} >
            <Time />
            <span style={{marginLeft: '1em', cursor: 'pointer'}} onClick={logOut}>退出</span>
        </div>
    </div>
);

export default Header;

function getTime() {
    let today = new Date();
    let ymd = today.toISOString().slice(0, 10);
    let hms = today.toTimeString().slice(0, 8);
    return `${ymd} ${hms}`;
}