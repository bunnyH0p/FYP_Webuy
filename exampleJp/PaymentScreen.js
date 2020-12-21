import React from "react";
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
import {
    AppForm as Form,
    AppFormField as FormField,
    AppFormPicker as Picker,
    SubmitButton,
} from "../componentJp/forms/index";
import Screen from "../componentJp/Screen";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropDownPicker from "react-native-dropdown-picker";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Cardholder Name"),
    cardNumber: Yup.string().required().matches(/^[0-9]{16}$/, 'Card Number must be 16 digits').label("Card Number"),
    eMonth: Yup.string().required().matches(/^[0-9]{2}$/, 'Must be a valid month number').label("Expiry Month"),
    eYear: Yup.number().required().min(21).max(50).label("Expiry Year"),
    cvv: Yup.string().required().matches(/^[0-9]{3}$/, 'CVV must be 3 digits').label("CVV"),
});


function PaymentScreen({ navigation }) {

    const handleSubmit = () => {
        alert("You have joined in the group!");
        navigation.navigate("Listings")
    };
    return (
        <KeyboardAwareScrollView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Screen style={styles.container}>
                    <Form
                        initialValues={{
                            name: "",
                            cardNumber: "",
                            eMonth: "",
                            eYear: "",
                            cvv: "",
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        <Text style={styles.titleText}>
                            Card Details
                            {"\n"}
                        </Text>
                        <DropDownPicker
                            items={[{ label: "Visa" }, { label: "Mastercard" }]}
                            containerStyle={{ height: 40 }}
                            style={{ backgroundColor: "#fafafa" }}
                            itemStyle={{
                                justifyContent: "flex-start",
                            }}
                        />
                        <FormField
                            name="name"
                            placeholder="Cardholder Name"
                        />
                        <FormField
                            name="cardNumber"
                            keyboardType="numeric"
                            placeholder="Card Number"
                        />
                        <FormField
                            name="eMonth"
                            keyboardType="numeric"
                            placeholder="Expiry Month"
                            width="35%"
                        />
                        <FormField
                            name="eYear"
                            keyboardType="numeric"
                            placeholder="Expiry Year"
                            width="35%"
                        />
                        <FormField
                            name="cvv"
                            keyboardType="numeric"
                            placeholder="cvv"
                            width="20%"
                        />
                        <SubmitButton title="Place order" />
                    </Form>
                </Screen>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    );
}
const styles = StyleSheet.create({
    container: {},
    titleText: {
        fontSize: 30,
        fontWeight: "bold"
    }
});

export default PaymentScreen;