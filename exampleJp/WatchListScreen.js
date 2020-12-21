import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import ActivityIndicator from "../componentJp/ActivityIndicator";
import AppText from "../componentJp/AppText";
import AppButton from "../componentJp/AppButton";
import Card from "../componentJp/Card";
import Color from "../componentJp/Color";
import Screen from "../componentJp/Screen";
import routes from "../AuthNavigator/routes";
import listingsApi from "../api/listings";
import useApi from "../componentJp/hooks/useApi";
import watchlistApi from "../api/watchLists";

function WatchListScreen({ navigation }) {
    const [refreshing, setRefreshing] = useState(false);
    const [ListingResult, setListingResult] = useState([]);
    const [WatchListResult, setWatchListResult] = useState([]);

    useEffect(() => {
        loadWatchLists();
        getListingsApi();
    }, []);

    const refresh = () => {
        loadWatchLists();
        getListingsApi();
    }

    const getListingsApi = async () => {
        const response = await listingsApi.getListings();
        setListingResult(response.data)
    };
    //console.log(ListingResult.length)

    const loadWatchLists = async () => {
        const wresponse = await watchlistApi.getWatchLists();
        setWatchListResult(wresponse.data)
    };
    // console.log("WatchListResult")
    // console.log(WatchListResult)

    const { user } = useAuth();
    //console.log(user)

    const filterResultByBuyerId = userId => {
        return WatchListResult.filter(result => {
            return result.buyerId == userId;
        });
    }

    const res = filterResultByBuyerId(user.userId);
    // console.log("hello")
    // console.log(res.data)

    const WatchList = [];

    for (let i = 0; i < res.length; i++) {
        for (let j = 0; j < ListingResult.length; j++) {
            if (res[i].itemId == ListingResult[j].id) {
                WatchList.push(ListingResult[j])
            }
        }
    }
    // console.log("Hello")
    // console.log(WatchList)



    return (
        <Screen style={styles.screen}>
            {getListingsApi.error && (
                <>
                    <AppText>Couldn't retrive the listings.</AppText>
                    <AppButton title="Retry" onPress={getListingsApi.request} />
                </>
            )}

            <FlatList
                data={WatchList}
                keyExtractor={(listing) => listing.id.toString()}
                renderItem={({ item }) => (
                    <Card
                        title={item.title}
                        subTitle={"$" + item.price}
                        imageUrl={item.images[0].url}
                        discount={item.discount}
                        onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
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
        padding: 10,
        backgroundColor: Color.light,
        flex: 1
    },
});

export default WatchListScreen;