import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, TouchableOpacity, Text } from "react-native";

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
import Icon from "../componentJp/Icon";



function ListingsScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);

  const getListingsApi = useApi(listingsApi.getListings)

  useEffect(() => {
    getListingsApi.request();
  }, []);

  return (
    <Screen style={styles.screen}>
      {getListingsApi.error && (
        <>
          <AppText>Couldn't retrive the listings.</AppText>
          <AppButton title="Retry" onPress={getListingsApi.request} />
        </>
      )}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>WeBuy</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")}>
          <Icon name="magnify" backgroundColor={Color.primary} />
        </TouchableOpacity>
      </View>


      <FlatList
        data={getListingsApi.data}
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
        onRefresh={getListingsApi.request}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: Color.light,
  },
  headerContainer: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between"
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Color.primary
  }
});

export default ListingsScreen;
