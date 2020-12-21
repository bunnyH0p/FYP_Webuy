import React from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
//npm install react-native-dropdown-picker --save
import RNPickerSelect from 'react-native-picker-select';
//npm install react-native-picker-select

import PropTypes from 'prop-types';

const PickerDetails = ({}) => {
    // Define all the Dropdown Lists' placeholders
    const categoryPlaceholder = {
        label: 'Select a Main Category',
        value: null, // Placeholder text should not have a value
        color: '#9EA0A4', // The vague color stays even when the dropdown list is opened
    };
    const subcategoryPlaceholder = {
        label: 'Select a Subcategory',
        value: null,
        color: '#9EA0A4',
    };
    const shippingFeePlaceholder = {
        label: 'Select a Shipping Fee',
        value: null,
        color: '#9EA0A4',
    };
    // Dropdown List placeholders END

    // Define all the Dropdown Lists' items
    const categoryItems = [
        {
            label: 'Man',
            value: 'man',
        },
        {
            label: 'Woman',
            value: 'woman',
        },
    ];

    const manSubcategoryItems = [
        {
            label: 'Top',
            value: 'top',
        },
        {
            label: 'Bottom',
            value: 'bottom',
        },
    ];
    const womanSubcategoryItems = [
        {
            label: 'Top1',
            value: 'top1',
        },
        {
            label: 'Bottom1',
            value: 'bottom1',
        },
    ];
    const shippingFeeItems = [
        {
            label: 'Free',
            value: 'free',
        },
        {
            label: 'Economy: $1.99',
            value: 'economy',
        },
        {
            label: 'Express: $4.99',
            value: 'express',
        },
    ];
    // Dropdown List items END
}

export default PickerDetails;