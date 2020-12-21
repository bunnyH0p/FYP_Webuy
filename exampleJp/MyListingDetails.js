import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, ScrollView, KeyboardAvoidingView } from "react-native";

import AppText from "../componentJp/AppText";
import Color from "../componentJp/Color";
import * as Progress from "react-native-progress";
import shoppingListsApi from "../api/shoppingLists";



function MyListingDetails({ route }) {

    const [results, setResults] = useState([]);

    useEffect(() => {
        loadShoppingLists();
    }, []);

    const loadShoppingLists = async () => {
        const response = await shoppingListsApi.getShoppingLists();
        setResults(response.data);
    }

    const filterResultsByitemId = itemId => {
        return results.filter(result => {
            return result.itemId == itemId;
        });
    };

    const { user } = useAuth();
    const listing = route.params;
    const itemId = listing.id;



    const result = filterResultsByitemId(itemId);

    return (
        <View>
            <ScrollView>
                <KeyboardAvoidingView
                    behavior="position"
                    keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
                >
                    <Image style={styles.image}
                        preview={{ uri: listing.images[0].thumbnailUrl }}
                        source={listing.images}
                        tint="light"
                        uri={listing.images[0].url} />

                    <View style={styles.detailsContainer}>

                        <View style={styles.titleContainer}>
                            <AppText style={styles.title}>{listing.title}</AppText>


                        </View>


                        <View style={styles.priceContainer}>
                            <AppText style={styles.price}>${listing.price}</AppText>
                            <AppText style={styles.discount}>{listing.discount}% Off</AppText>
                        </View>


                        <AppText style={styles.price}>Now ${listing.price * (100 - listing.discount) / 100}</AppText>
                        <AppText style={styles.description}>Description :{listing.description}</AppText>
                        <View style={styles.groupContainer}>
                            <AppText style={styles.description}>Current number of Shoppers :{result.length} </AppText>
                            <AppText style={styles.description}>Minimum required for activation :{listing.noOfBuyers}</AppText>
                            <Progress.Bar color={Color.primary} progress={result.length / listing.noOfBuyers} />

                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 300,
    },
    detailsContainer: {
        padding: 20,
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",

    },
    priceContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    price: {
        color: Color.secondary,
        fontWeight: "bold",
        fontSize: 20,
        marginVertical: 10,
    },
    discount: {
        color: Color.primary,
        fontWeight: "bold",
        fontSize: 20,
        marginVertical: 10,
    },
    description: {
        color: Color.black,
        fontWeight: "bold",
        fontSize: 20,
        marginVertical: 10,
    },
    groupContainer: {
        marginVertical: 40,
        justifyContent: "center",
        alignItems: 'center',
    },
    joinButton: {
        width: "80%",

    }
});

export default MyListingDetails;