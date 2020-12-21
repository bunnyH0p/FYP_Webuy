import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";

import GroupListsScreen from "../exampleJp/GroupListsScreen";
import GroupListDetailsScreen from "../exampleJp/GroupListDetailsScreen";

const Stack = createStackNavigator();

const GroupNavigator = () => (
    <Stack.Navigator mode="modal" >
        <Stack.Screen name="GroupListsScreen" component={GroupListsScreen} options={{ title: "My Joined Groups" }} />
        <Stack.Screen name="GroupListDetailsScreen" component={GroupListDetailsScreen} options={{ title: "Group item details" }}/>
    </Stack.Navigator>
);

const styles = StyleSheet.create({
    container: {}
});

export default GroupNavigator;