import React from 'react';
import { View, StyleSheet } from 'react-native';
import Color from './Color';


export default function Separator() {
    return (
        <View style={styles.separator} />
    )
}


const styles = StyleSheet.create({
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: Color.light,
    },
});