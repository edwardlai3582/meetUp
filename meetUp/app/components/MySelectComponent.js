import React, { Component } from 'react';
import Select from 'react-select';

export default class MySelectComponent extends Component {
    render() {
        const {alert, value, onBlur, ...props} = this.props;
    
        return (
            <Select className={alert?"alert":""} allowCreate="true" value={value || ''} onBlur={() => onBlur(value)} {...props}/>      
        );                
    }
}
//className={alert?"alert":""}