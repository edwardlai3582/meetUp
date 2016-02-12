import React, { Component } from 'react';
import Select from 'react-select';

export default class MyMultiSelectComponent extends Component {
    render() {
        const { alert, value, onBlur, ...props} = this.props;
    
        return (
            <Select multi="true" className={alert?"alert":""} allowCreate="true" value={value || ''} onBlur={() => onBlur(value)} {...props}/>      
        );                
    }
}
