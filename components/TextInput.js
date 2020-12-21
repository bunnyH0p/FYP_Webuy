import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import PropTypes from 'prop-types';

import defaultStyles from "../config/styles";

TextInput.propTypes = {
    keyboardType: PropTypes.string,
    placeholder: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    multiline: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
}

const TextInputTheme = ({ icon, keyboardType, placeholder, width, height, multiline, onChange, onBlur, ...otherProps }) => {
    return (
        <View style={[styles.input, { width: width }, { height: height }]}>
            {icon && (
                <FontAwesome
                    name={icon}
                    size={20}
                    color={defaultStyles.colors.medium}
                    style={styles.icon}
                />
            )}
            <TextInput
                placeholder={placeholder}
                keyboardType={keyboardType}
                multiline={multiline}
                onChange={onChange}
                onBlur={onBlur}
                {...otherProps}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        padding: 10,
        margin: 10,
        textAlignVertical: 'top',
        borderColor: '#fc5c65',
        flexDirection: "row",
    },
    icon: {
        marginRight: 10,
    },
});

export default TextInputTheme;