import React, { useState } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./AuthNavigator/AuthNavigator";
import navigationTheme from "./AuthNavigator/navigationTheme";
import AppNavigator from "./AuthNavigator/AppNavigator";
import AuthContext from "./auth/context";
import authStorage from './auth/storage';
import { AppLoading } from 'expo';




//=====================================================================

export default function App() {

  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (!user) setUser(user);
  }
  if (!isReady)
    return <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} />

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
