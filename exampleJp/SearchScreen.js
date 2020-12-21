import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ActivityIndicator from "../componentJp/ActivityIndicator";
import AppText from "../componentJp/AppText";
import AppButton from "../componentJp/AppButton";
import Card from "../componentJp/Card";
import Color from "../componentJp/Color";
import Screen from "../componentJp/Screen";
import routes from "../AuthNavigator/routes";
import listingsApi from "../api/listings";
import useApi from "../componentJp/hooks/useApi";
import SearchBar from "../componentJp/SearchBar";




function SearchScreen({ navigation }) {
    const [refreshing, setRefreshing] = useState(false);
    const [term, setTerm] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        loadListings()
    }, []);

    const loadListings = async () => {
        const response = await listingsApi.getListings();
        setResults(response.data);
    }
    //console.log(results)

    const filterResult = term => {
        return results.filter(result => {
            return result.title === term;
        });
    }
    const res = filterResult(term)

    return (
        <View style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Screen style={styles.screen}>
                    {loadListings.error && (
                        <>
                            <AppText>Couldn't retrive the listings.</AppText>
                            <AppButton title="Retry" onPress={loadListings} />
                        </>
                    )}
                    <View style={styles.headerContainer}>
                        <SearchBar
                            term={term}
                            onTermChange={newTerm => setTerm(newTerm)}
                            onTermSubmit={() => filterResult(term)}
                        />

                    </View>
                    <Text>Results found :{res.length}</Text>

                    {<FlatList
                        data={res}
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
                        onRefresh={loadListings}
                    />
                    }
                </Screen>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 5,
        backgroundColor: Color.light,
    },
    headerContainer: {
        padding: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: Color.primary
    }
});

export default SearchScreen;