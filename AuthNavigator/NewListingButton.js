import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Color from "../componentJp/Color";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function NewListingButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="plus-circle"
          color={Color.white}
          size={30}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.black,
    borderColor: Color.white,
    borderRadius: 20,
    borderWidth: 5,
    height: 60,
    width: 60,
    bottom: 20,
  },
});

export default NewListingButton;
