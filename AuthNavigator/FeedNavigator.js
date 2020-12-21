import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingsScreen from "../exampleJp/ListingsScreen";
import ListingDetails from "../exampleJp/ListingDetails";
import PaymentScreen from "../exampleJp/PaymentScreen";
import SearchScreen from "../exampleJp/SearchScreen";
import AddressScreen from "../exampleJp/AddressScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Listings" component={ListingsScreen} />
    <Stack.Screen name="SearchScreen" component={SearchScreen} />
    <Stack.Screen name="ListingDetails" component={ListingDetails} />
    <Stack.Screen name="Payment" component={PaymentScreen} />
    <Stack.Screen name="AddressScreen" component={AddressScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
