import React from 'react';
import _ from 'lodash';
import { colorsMap } from '../../shared/constants';

export default class SubjectGrpSelector extends React.Component {
    constructor(props) {
        super(props);
        var subjectGrps = [
            { id: '1', name: '选科组合（三科）' },
            { id: '2', name: '选科组合（两科）' },
            { id: '3', name: '选科组合（单科）' },
            { id: '4', name: '各校选科数据对比' },
            { id: '5', name: '历史选科数据对比' },
        ];
        this.state = {
            subjectGrps,
            currentSubjectGrp: subjectGrps[0]
        }
    }

    changeSubjectGrp(id) {
        var currentSubjectGrp = this.state.subjectGrps.find(subjectGrp => subjectGrp.id === id);
        this.setState({ currentSubjectGrp });
    }

    render() {
        return (
            <div style={{ width: 136, borderRadius: 2, position: 'fixed', left: 'calc(50% - 615px)', top: 300 }} >
                {
                    _.map(this.state.subjectGrps, subjectGrp => {
                        var isActive = subjectGrp.id===this.state.currentSubjectGrp.id;
                        var bgColor = isActive ? colorsMap['B02'] : colorsMap['B04'];
                        var borderRadius = isActive ? 2 : 0;
                        var color = isActive ? '#FFF' : colorsMap['T01'];
                        return (
                            <div key={subjectGrp.name}
                                style={{padding: '12px 0 12px 12px', fontSize: 14, color, backgroundColor: bgColor, borderRadius, cursor: 'pointer' }}
                                onClick={this.changeSubjectGrp.bind(this, subjectGrp.id)}
                            >
                                {subjectGrp.name}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}