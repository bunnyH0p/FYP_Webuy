import React from 'react';
import { View, StyleSheet, TextInput, SafeAreaView } from 'react-native';
import { Entypo } from "@expo/vector-icons";


function SearchBar({ term, onTermChange, onTermSubmit }) {

    return (
        <SafeAreaView>
            <View style={styles.background}>
                <Entypo name="magnifying-glass" style={styles.iconStyle} />
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.inputStyle}
                    placeholder="Search"
                    value={term}
                    onChangeText={onTermChange}
                    onEndEditing={onTermSubmit}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        marginTop: 15,
        backgroundColor: "#F0EEEE",
        height: 40,
        borderRadius: 20,
        flexDirection: "row",

    },
    inputStyle: {
        flex: 1,
        fontSize: 18
    },
    iconStyle: {
        fontSize: 25,
        alignSelf: "center",
        marginHorizontal: 15
    }
});

export default SearchBar;