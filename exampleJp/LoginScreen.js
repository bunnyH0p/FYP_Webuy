import React, { useState, useContext } from 'react';
import { StyleSheet, Text, Image, ImageBackground, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Yup from "yup";

import useAuth from "../auth/useAuth";
import authApi from "../api/auth";
import Screen from "../componentJp/Screen";
import AppButton from "../componentJp/AppButton";
import routes from '../AuthNavigator/routes';
import { AppForm, AppFormField, SubmitButton, ErrorMessage } from "../componentJp/forms/index";

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().label("Password")
});


function LoginScreen({ navigation }) {
    const auth = useAuth();
    const [loginFailed, setLoginFailed] = useState(false);

    const handleSubmit = async ({ email, password }) => {
        const result = await authApi.login(email, password);
        if (!result.ok) return setLoginFailed(true);
        setLoginFailed(false);
        auth.logIn(result.data);
    }

    return (

        <ImageBackground
            blurRadius={10}
            style={styles.background}
            source={require("../../assets/BlurBackground.jpeg")}
        >
            <KeyboardAwareScrollView style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Screen style={styles.container}>

                        <Image
                            style={styles.logo}
                            source={require("../../assets/2.png")}
                        />
                        <AppForm
                            initialValues={{ email: "", password: "" }}
                            onSubmit={handleSubmit}
                            validationSchema={validationSchema}
                        >
                            <ErrorMessage
                                error="Invalid email and/or password."
                                visible={loginFailed}

                            />
                            <AppFormField
                                name="email"
                                autoCapitalize="none"
                                autoCorrect={false}
                                icon="email"
                                keyboardType="email-address"
                                placeholder="Email"
                                textContentType="emailAddress" />
                            <AppFormField
                                name="password"
                                autoCapitalize="none"
                                autoCorrect={false}
                                icon="lock"
                                placeholder="Password"
                                secureTextEntry={true}
                                textContentType="password" />
                            <SubmitButton title="Login" />

                        </AppForm>
                        <AppButton title="Register Account" color="secondary" onPress={() => navigation.navigate(routes.REGISTER)} />
                    </Screen>
                </TouchableWithoutFeedback>
            </KeyboardAwareScrollView>
        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    container: {
        padding: 10
    },
    logo: {
        width: 350,
        height: 175,
    },
    logoText: {
        width: 80,
        height: 80,
        alignSelf: "center",
        marginTop: 50,
        marginBottom: 20,
        fontWeight: "bold",
        fontSize: 25,
        color: "#fc5c65"
    }
})




export default LoginScreen;