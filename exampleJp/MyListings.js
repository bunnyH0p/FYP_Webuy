import React, { useEffect, useState, useCallback } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

import AppText from "../componentJp/AppText";
import AppButton from "../componentJp/AppButton";
import Card from "../componentJp/Card";
import Color from "../componentJp/Color";
import Screen from "../componentJp/Screen";
import routes from "../AuthNavigator/routes";
import listingsApi from "../api/listings";
import useApi from "../componentJp/hooks/useApi";
import {
    ListItem,
    ListItemDeleteAction,
    ListItemSeparator,
} from "../components/lists";



function MyListingsScreen({ navigation, props }) {
    const [results, setResults] = useState([]);

    useEffect(() => {
        loadMyLists();
    }, []);

    const loadMyLists = async () => {
        const response = await listingsApi.getMyListings();
        setResults(response.data);
    }

    const handleDelete = async (itemId) => {
        const res = await listingsApi.deleteMyListings(
            { itemId }
        );
        setResults(res.data);
        if (!res.ok) {
            //return alert('item saved to watchlist')
        };
    };


    return (
        <Screen style={styles.screen}>


            <FlatList
                data={results}
                keyExtractor={(listing) => listing.id.toString()}
                renderItem={({ item }) => {
                    return (
                        <ListItem
                            title={item.title}
                            thumbnailUrl={item.images[0].thumbnailUrl}
                            subTitle={"$" + item.price}
                            image={item.images[0].thumbnailUrl}
                            onPress={() => navigation.navigate(routes.MY_LISTING_DETAILS, item)}
                            renderRightActions={() => (

                                <ListItemDeleteAction onPress={() => handleDelete(item.itemId)} />

                            )}
                        />)
                }}
                ItemSeparatorComponent={ListItemSeparator}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 10,
        backgroundColor: Color.light,
    },
});

export default MyListingsScreen;