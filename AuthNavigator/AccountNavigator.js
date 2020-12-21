import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../exampleJp/AccountScreen";
import MessagesScreen from "../exampleJp/MessageScreen";
import MyListingsScreen from "../exampleJp/MyListings";
import OrderDetailsScreen from "../exampleJp/OrderDetails";
import AboutUsScreen from "../exampleJp/AboutUsScreen";
import MyListingDetails from "../exampleJp/MyListingDetails";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen name="MyListings" component={MyListingsScreen} options={{ title: "My Listings" }}/>
    <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} options={{ title: "Order Requests" }}/>
    <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} options={{ title: "About Us" }}/>
    <Stack.Screen name="MyListingDetails" component={MyListingDetails} options={{ title: "Listing Details" }} />


  </Stack.Navigator>
);

export default AccountNavigator;
