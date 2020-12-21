import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Color from "./Color";

function AppButton({ title, onPress, color = "primary" }) {
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: Color[color] }]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Color.primary,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        width: "100%",
        marginVertical: 5
    },
    text: {
        color: "#fff",
        fontSize: 18,
        textTransform: "uppercase",
        fontWeight: "bold"

    },

})

export default AppButton;