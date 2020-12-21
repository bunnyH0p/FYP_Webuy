import React, { useState, useEffect } from "react";
import {
  Alert,
  View,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";

import AppText from "../componentJp/AppText";
import Color from "../componentJp/Color";
import ListItem from "../componentJp/ListItem";
import * as Progress from "react-native-progress";
import AppButton from "../componentJp/AppButton";
import shoppingListsApi from "../api/shoppingLists";
import orderListApi from "../api/orderLists";
import useApi from "../componentJp/hooks/useApi";
import useAuth from "../auth/useAuth";
import listingsApi from "../api/listings";
import { ScrollView } from "react-native-gesture-handler";

function GroupListDetailsScreen({ route, navigation }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    loadShoppingLists();
  }, []);

  const loadShoppingLists = async () => {
    const response = await shoppingListsApi.getShoppingLists();
    setResults(response.data);
  };

  // console.log(results.length)

  const filterResultsByitemId = (itemId) => {
    return results.filter((result) => {
      return result.itemId == itemId;
    });
  };

  const { user } = useAuth();
  const buyerId = parseInt(user.userId);
  const listing = route.params;
  const title = listing.title;
  const price = listing.price;
  const discount = listing.discount;
  const userId = listing.userId;
  const categoryId = listing.categoryId;
  const description = listing.description;
  const noOfBuyers = listing.noOfBuyers;
  const itemId = listing.id;
  const images = listing.images[0];

  const leaveGroup = () => {
    handleDelete();
    handleODelete();
    navigation.navigate("GroupListsScreen");
  };

  const handleDelete = async (itemId) => {
    const res = await shoppingListsApi.deleteShoppingLists({ itemId });

    //console.log(res)
    if (!res.ok) {
      //return alert('Could not delete the shoppinglists')
    }
  };

  const handleODelete = async (itemId) => {
    const res = await orderListApi.deleteOrderList({ itemId });

    //console.log(res)
    if (!res.ok) {
      //return alert('Could not delete the shoppinglists')
    }
  };

  const handleSubmit = async (listing) => {
    const res = await shoppingListsApi.addShoppingList({
      title,
      price,
      discount,
      userId,
      categoryId,
      description,
      buyerId,
      noOfBuyers,
      itemId,
      images,
    });

    //console.log(res)
    if (!res.ok) {
      return alert("Could not save the shoppinglists");
    }
  };
  const result = filterResultsByitemId(itemId);

  return (
    <View>
      <ScrollView>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
        >
          <Image
            style={styles.image}
            preview={{ uri: listing.images[0].thumbnailUrl }}
            source={listing.images}
            tint="light"
            uri={listing.images[0].url}
          />

          <View style={styles.detailsContainer}>
            <AppText style={styles.title}>{title}</AppText>
            <AppText style={styles.price}>${listing.price}</AppText>
            <AppText style={styles.price}>
              Discount :{listing.discount}%
            </AppText>
            <AppText style={styles.price}>
              Now ${(listing.price * (100 - listing.discount)) / 100}
            </AppText>
            <AppText style={styles.description}>
              Description :{listing.description}
            </AppText>
            <View style={styles.groupContainer}>
              <AppText style={styles.description}>
                Current group: {result.length} / {listing.noOfBuyers}
              </AppText>
              <Progress.Bar
                color={Color.primary}
                progress={result.length / listing.noOfBuyers}
              />
              <View style={styles.joinButton}>
                <AppButton
                  title="Leave"
                  onPress={() =>
                    Alert.alert(
                      "Alert",
                      "Do you want to leave the group now?",
                      [{ text: "Yes", onPress: leaveGroup }, { text: "No" }]
                    )
                  }
                />
              </View>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  price: {
    color: Color.secondary,
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
    alignItems: "center",
  },
  joinButton: {
    width: "80%",
  },
});

export default GroupListDetailsScreen;
