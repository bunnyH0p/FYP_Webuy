import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Color from "../componentJp/Color";


function ViewImage() {
    return (
        <View style={styles.container}>
            <View style={styles.closeIcon}>
                <MaterialCommunityIcons name="close" color={Color.white} size={35} />
            </View>
            <View style={styles.deletIcon}>
                <MaterialCommunityIcons name="trash-can-outline" color={Color.white} size={35} />
            </View>
            <Image
                resizeMode="contain"
                style={styles.image}
                source={require("../../assets/RedFila1.png")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    closeIcon: {
        position: "absolute",
        top: 40,
        left: 30,
    },
    container: {
        backgroundColor: Color.black,
        flex: 1,
    },
    deletIcon: {
        position: "absolute",
        top: 40,
        right: 30
    },
    image: {
        width: "100%",
        height: "100%"
    }


})

export default ViewImage;