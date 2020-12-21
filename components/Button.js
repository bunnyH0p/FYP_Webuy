import React from 'react';
import { Button, View, StyleSheet, Platform } from 'react-native';
import PropTypes from 'prop-types';

Button.propTypes = {
    theme: PropTypes.oneOf(['primary', 'secondary']),
    text: PropTypes.string,
    onPress: PropTypes.func,
    width: PropTypes.number
}
const ButtonTheme = ({ text, theme, onPress, width }) => {
    const renderColor = () => {
        if (theme === 'primary') return styles.primary;
        else return styles.secondary;
    }
    return (
        <View style={[styles.size, renderColor(), { width: width }]} >
            <Button
                title={text}
                color={Platform.OS === 'ios' ? '#fff' : '#fc5c65'} // iOS and Android behave differently for colors
                onPress={onPress}
            />
        </View>
    )
}

//button fixed styling
const styles = StyleSheet.create({
    size: {
        paddingTop: 3,
        paddingRight: 5,
        paddingBottom: 3,
        paddingLeft: 5,
    },
    primary: {
        backgroundColor: '#fc5c65',
        borderRadius: 10,
    },
    secondary: {
        backgroundColor: 'green',
        borderRadius: 10,
    },
    text: {
        textAlign: 'center'
    }
});

export default ButtonTheme;