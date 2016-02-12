import React, { Component } from 'react';
import Select from 'react-select';

export default class MySelectComponent extends Component {
    render() {
        const { multi, alert, value, onBlur, ...props} = this.props;
    
        return (
            <Select multi={multi} className={alert?"alert":""} allowCreate="true" value={value || ''} onBlur={() => onBlur(value)} {...props}/>      
        );                
    }
}
