import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import WatchListScreen from "../exampleJp/WatchListScreen";
import WatchListDetailsScreen from "../exampleJp/WatchListDetailsScreen";


const Stack = createStackNavigator();

const WatchlistNavigator = () => (
    <Stack.Navigator mode="modal" >
        <Stack.Screen name="WatchListScreen" component={WatchListScreen} options={{ title: "Watchlist" }} />
        <Stack.Screen name="WatchListDetails" component={WatchListDetailsScreen} />
    </Stack.Navigator>
);

export default WatchlistNavigator;