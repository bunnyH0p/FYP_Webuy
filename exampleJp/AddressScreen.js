import React, { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from "yup";

import {
    AppForm as Form,
    AppFormField as FormField,
    SubmitButton,
} from "../componentJp/forms/index";
import Screen from "../componentJp/Screen";
import olistingsApi from "../api/orderLists";
import UploadScreen from "./UploadScreen";
import useAuth from "../auth/useAuth";




const validationSchema = Yup.object().shape({
    lastName: Yup.string().required().min(1).label("Last Name"),
    firstName: Yup.string().required().min(1).label("First Name"),
    phoneNumber: Yup.number().required().label("Phone Number"),
    email: Yup.string().required().label('Email'),
    addressLine1: Yup.string().required().min(1).label("Address Line 1"),
    addressLine2: Yup.string().label("Address Line 2"),
    city: Yup.string().required().min(1).label("City"),
    postalCode: Yup.number().required().min(1).label("Postal Code"),
    country: Yup.string().required().min(1).label("Country"),
});

function AddressScreen({ route, navigation }) {
    const result = route.params;
    const sellerId = result.userId;
    const title = result.title;
    const categoryId = result.categoryId;
    const itemId = result.id;

    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const { user } = useAuth();
    const buyerId = user.userId;


    const handleSubmit = async (listing, { resetForm }) => {
        setUploadVisible(true);
        const result = await olistingsApi.addOListing(
            { ...listing, buyerId, categoryId, itemId, sellerId, title },
            (progress) => setProgress(progress)
        );
        // console.log(result)
        if (!result.ok) {
            setUploadVisible(false);
            return alert('Could not save the listing.');
        }
        resetForm();
        navigation.navigate('Payment');
    };

    return (
        <KeyboardAwareScrollView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Screen style={styles.container}>

                    <Form
                        initialValues={{
                            lastName: "",
                            firstName: "",
                            phoneNumber: "",
                            email: "",
                            addressLine1: "",
                            addressLine2: "",
                            city: "",
                            postalCode: "",
                            country: "",
                            category: null,

                        }}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        <FormField maxLength={255} name="lastName" placeholder="Last Name" width="70%" />
                        <FormField maxLength={255} name="firstName" placeholder="First Name" width="70%" />
                        <FormField
                            keyboardType="numeric"
                            maxLength={8}
                            name="phoneNumber"
                            placeholder="Phone Number"
                            width="50%"

                        />
                        <FormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="email-address"
                            maxLength={255}
                            name="email"
                            placeholder="Email"
                            width="70%"
                        />
                        <FormField
                            maxLength={255}
                            name="addressLine1"
                            placeholder="Address Line 1"
                            width="80%"
                        />
                        <FormField
                            maxLength={255}
                            name="addressLine2"
                            placeholder="Address Line 2"
                            width="80%"
                        />
                        <FormField
                            keyboardType="numeric"
                            name="postalCode"
                            numberOfColumns={3}
                            placeholder="Postal Code"
                            width="50%"
                        />
                        <FormField
                            maxLength={255}
                            name="city"
                            placeholder="City"
                            width="50%"
                        />
                        <FormField
                            maxLength={255}
                            name="country"
                            placeholder="Country"
                            width="70%"
                        />

                        <SubmitButton title="Proceed" />
                    </Form>
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
export default AddressScreen;
