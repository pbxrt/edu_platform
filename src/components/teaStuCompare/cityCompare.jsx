import React from 'react';

import Select from '../../commonComponents/select';

const Item = ({ number, text }) => (
    <div>
        <span style={{ color: '#f2a60d', fontSize: 20 }} >{number}</span>
        <span style={{ color: '#a8c9f0', fontSize: 14, paddingLeft: 7 }} >{text}</span>
    </div>
)

export default class CityCompare extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    selectPeriod(period) {
        this.setState({ period })
    }

    selectGrade(grade) {
        this.setState({ grade })
    }

    render() {
        const { periodOptions, gradeOptions, city } = this.props;
        return (
            <div >
                <div style={{width: 1155, margin: '0 auto', padding: '40px 0 60px 0'}} >
                    <header style={{ position: 'relative', padding: '18px 0 68px 0' }} >
                        <div style={{ position: 'absolute', right: 0, display: 'flex', justifyContent: 'flex-end' }} >
                            <Select
                                options={periodOptions}
                                handleSelect={this.selectPeriod.bind(this)}
                            />
                            <div style={{ display: 'inline-block', paddingLeft: 10}} >
                                <Select
                                    options={gradeOptions}
                                    handleSelect={this.selectGrade.bind(this)}
                                    width={100}
                                />
                            </div>
                        </div>
                        <div style={{ fontSize: 22, textAlign: 'center' }} >{city}师生比例分析</div>
                    </header>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                        <Item number={179} text={'教师'} />
                        <Item number={160997} text={'学生'} />
                        <Item number={'1:28'} text={'师生比'} />
                    </div>
                    <div style={{ height: 400, display: 'flex' }} >
                        <div style={{  margin: 'auto' }} >数据可视化柱状图</div>
                    </div>
                </div>
            </div>
        )
    }
}