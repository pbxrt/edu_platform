import React from 'react';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';
import '../styles/select.css';

const Select = ({...props}) => {
    return (
        <ReactSelect {...props} />
    );
}

export default Select