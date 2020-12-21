import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

import Screen from "../componentJp/Screen";
import ListItem from "../componentJp/ListItem";
import Color from "../componentJp/Color";
import Icon from "../componentJp/Icon";
import Separator from "../componentJp/Separator";
import useAuth from "../auth/useAuth";


const menuItems = [
  {
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: Color.primary,
    },
    targetScreen: "MyListings",
  },
  {
    title: "Order Requests",
    icon: {
      name: "store",
      backgroundColor: Color.secondary,
    },
    targetScreen: "OrderDetails",
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: "green",
    },
    targetScreen: "Messages",
  },
  {
    title: "About Us",
    icon: {
      name: "information",
      backgroundColor: "tomato",
    },
    targetScreen: "AboutUsScreen",
  },
];

function AccountScreen({ navigation }) {

  const { user, logOut } = useAuth();



  return (
    <Screen style={styles.screen}>
      <View style={StyleSheet.container}>
        <ListItem
          title={user.name}
          subTitle={user.email}
        //image={require("../../assets/spiderUser.png")}
        />
      </View>

      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={Separator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>

      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={() => logOut()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Color.light,
  },
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
