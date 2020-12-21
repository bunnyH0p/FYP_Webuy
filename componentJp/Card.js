import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import Color from "./Color";
import AppText from "./AppText";

function Card({ title, subTitle, imageUrl, onPress, discount }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>


      <View style={styles.Card}>
        <Image style={styles.image} source={{ uri: imageUrl }} />


        <View style={styles.detailsContainer}>
          <AppText style={styles.title}>{title}</AppText>

          <View style={styles.container}>
            <AppText style={styles.subTitle}>{subTitle}</AppText>
            <AppText style={styles.discount}>Discount {discount}%</AppText>
          </View>


        </View>

      </View>
    </TouchableWithoutFeedback>
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
  title: {
    marginBottom: 7,
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

export default Card;
