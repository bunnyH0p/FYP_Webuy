import React, { useState } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as Yup from 'yup';

import {
    AppForm as Form,
    AppFormField as FormField,
    SubmitButton,
    ErrorMessage
} from "../componentJp/forms/index";
import Screen from "../componentJp/Screen";
import usersApi from '../api/users';
import useAuth from '../auth/useAuth';
import authApi from '../api/auth';
import routes from '../AuthNavigator/routes';
import AppButton from "../componentJp/AppButton";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(6).matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, //(?=.*[!@#\$%\^&\*]) add this in if requires special symbol
        'Password must contain at least 1 Uppercase letter, 1 Lowercase letter and 1 number'
    ).label("Password"),
});

function RegisterScreen({ navigation }) {
    const auth = useAuth();
    const [error, setError] = useState();

    const handleSubmit = async (userInfo) => {

        const result = await usersApi.register(userInfo);

        if (!result.ok) {
            if (result.data) {
                setError(result.data.error);
            }
            else {
                setError("An unexpected error occurred.");
                console.log(result);
            }
            return;
        }
        const { data: authToken } = await authApi.login(
            userInfo.email,
            userInfo.password
        );
        auth.logIn(authToken);
    };


    return (
        <KeyboardAwareScrollView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Screen style={styles.container}>
                    <Form
                        initialValues={{ name: "", email: "", password: "" }}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        <ErrorMessage error={error} visible={error} />
                        <FormField
                            autoCorrect={false}
                            icon="account"
                            name="name"
                            placeholder="Name"
                        />
                        <FormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="email"
                            keyboardType="email-address"
                            name="email"
                            placeholder="Email"
                            textContentType="emailAddress"
                        />
                        <FormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="lock"
                            name="password"
                            placeholder="Password"
                            secureTextEntry
                            textContentType="password"
                        />
                        <SubmitButton title="Register" />
                    </Form>
                    <AppButton title="Back" color="secondary" onPress={() => navigation.navigate(routes.LOGIN)} />
                </Screen>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
});

export default RegisterScreen;