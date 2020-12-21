import React from "react";
import {
    View,
    StyleSheet,
} from "react-native";
import Color from "./Color";
import AppText from "./AppText";

function OrderLists({
    title,
    firstName,
    lastName,
    email,
    phoneNumber,
    addressLine1,
    addressLine2,
    city,
    country,
    postalCode }) {
    return (



        <View style={styles.Card}>
            <AppText style={styles.headerText}>{title}</AppText>
            <AppText style={styles.title}> Shopper :{firstName} {lastName}</AppText>
            <AppText style={styles.title}> Email : {email}</AppText>
            <AppText style={styles.title}> Phone Numner : {phoneNumber}</AppText>
            <AppText style={styles.title}> Address Line 1 : {addressLine1}</AppText>
            <AppText style={styles.title}> Address Line 2 : {addressLine2}</AppText>
            <AppText style={styles.title}> City : {city}</AppText>
            <AppText style={styles.title}> Country : {country}</AppText>
            <AppText style={styles.title}> Postal Code : {postalCode}</AppText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    Card: {
        borderRadius: 10,
        backgroundColor: Color.white,
        marginBottom: 20,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: 210,
    },
    detailsContainer: {
        padding: 20,
        height: 85,
    },
    headerText: {
        marginBottom: 2,
        color: Color.black,
        fontWeight: "bold"
    },
    title: {
        marginBottom: 2,
        color: Color.black,
    },
    subTitle: {
        color: Color.secondary,
        fontWeight: "bold",
    },
    discount: {
        color: Color.primary,
        fontWeight: "bold",
    }
});

export default OrderLists;