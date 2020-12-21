
import React from "react";
import { View, StyleSheet, Linking, Image } from "react-native";

import Screen from "../componentJp/Screen";
import ListItem from "../componentJp/ListItem";
import Color from "../componentJp/Color";
import AppButton from "../componentJp/AppButton";
import Separator from "../componentJp/Separator";
import listings from "../api/listings";
import { List } from "react-native-paper";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import ListingsScreen from "./ListingsScreen";


function AboutUsScreen(props) {
    return (
        <Screen style={styles.screen}>
            <Image
                style={styles.logo}
                source={require("../../assets/2.png")}
            />


            <ScrollView>
                <ListItem
                    title="Zhu Huaying"
                    subTitle="Project Manager"
                    image={require("../../assets/hy.jpg")}>
                </ListItem>
                <ListItem
                    title="Cheong Wen Qing Felicia"
                    subTitle="Quality Assurance Lead"
                    image={require("../../assets/f.jpg")}>
                </ListItem>
                <ListItem
                    title="Brandon Boey"
                    subTitle="User Lead"
                    image={require("../../assets/b.jpg")}>
                </ListItem>
                <ListItem
                    title="Wang Jingpeng"
                    subTitle="Technical Lead"
                    image={require("../../assets/jp.jpg")}>
                </ListItem>
                <ListItem
                    title="Wong Ke Xin"
                    subTitle="Design Lead"
                    image={require("../../assets/kx.jpg")}>
                </ListItem>

                <AppButton
                    title="Our Website"
                    onPress={() => Linking.openURL("https://kexin97.wixsite.com/fyp-20-s3-12")}></AppButton>

            </ScrollView>

        </Screen >
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 350,
        height: 175,
    },
    screen: {
        backgroundColor: Color.light,
    },
    container: {
        marginVertical: 20,
        flex: 1
    },
    photo: {
        width: 100,
        height: 100,
    },
});



export default AboutUsScreen;