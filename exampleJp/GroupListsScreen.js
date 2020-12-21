import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import AppText from "../componentJp/AppText";
import AppButton from "../componentJp/AppButton";
import Card from "../componentJp/Card";
import Color from "../componentJp/Color";
import Screen from "../componentJp/Screen";
import routes from "../AuthNavigator/routes";
import listingsApi from "../api/listings";
import useApi from "../componentJp/hooks/useApi";
import useAuth from "../auth/useAuth";
import shoppingListsApi from "../api/shoppingLists";


function GroupListsScreen({ navigation }) {

    const [refreshing, setRefreshing] = useState(false);
    const [ListingResult, setListingResult] = useState([]);
    const [ShoppingResult, setShoppingResult] = useState([]);

    useEffect(() => {
        loadShoppingLists();
        getListingsApi();
    }, []);

    const refresh = () => {
        loadShoppingLists();
        getListingsApi();
    }

    const getListingsApi = async () => {
        const response = await listingsApi.getListings();
        setListingResult(response.data)
    };

    const loadShoppingLists = async () => {
        const sresponse = await shoppingListsApi.getShoppingLists();
        setShoppingResult(sresponse.data)
    };

    const { user } = useAuth();

    const filterResultByBuyerId = userId => {
        return ShoppingResult.filter(result => {
            return result.buyerId == userId;
        });
    }

    const res = filterResultByBuyerId(user.userId);


    // console.log("hello")
    // console.log(res.length)

    const cartList = [];

    for (let i = 0; i < res.length; i++) {
        for (let j = 0; j < ListingResult.length; j++) {
            if (res[i].itemId == ListingResult[j].id) {
                cartList.push(ListingResult[j])
            }
        }
    }
    // console.log("Hello")
    // console.log(cartList)

    return (
        <Screen style={styles.screen}>
            {getListingsApi.error && (
                <>
                    <AppText>Couldn't retrive the listings.</AppText>
                    <AppButton title="Retry" onPress={getListingsApi} />
                </>
            )}

            <FlatList
                data={cartList}
                keyExtractor={(listing) => listing.id.toString()}
                renderItem={({ item }) => (
                    <Card
                        title={item.title}
                        subTitle={"$" + item.price}
                        imageUrl={item.images[0].url}
                        discount={item.discount}
                        onPress={() => navigation.navigate(routes.GROUPLISTING_DETAILS, item)}
                    />
                )}
                refreshing={refreshing}
                onRefresh={refresh}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        backgroundColor: Color.light,
    },
});

export default GroupListsScreen;