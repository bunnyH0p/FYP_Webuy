import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";

import AppText from "../componentJp/AppText";
import Color from "../componentJp/Color";
import * as Progress from "react-native-progress";
import AppButton from "../componentJp/AppButton";
import shoppingListsApi from "../api/shoppingLists";
import useAuth from "../auth/useAuth";
import Icon from "../componentJp/Icon";
import { ScrollView } from "react-native-gesture-handler";
import watchListsApi from "../api/watchLists";
import routes from "../AuthNavigator/routes";
import { Notifications } from "expo";



function ListingDetails({ route, navigation }) {
  const [results, setResults] = useState([]);
  const [like, setLike] = useState(false);

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

  const Payment = () => {
    handleSubmit();
    handleDelete();
    navigation.navigate(routes.ADDRESS, listing);
  }
  const liked = () => {
    setLike(true);
    addtoWatchList();
  }
  const unLiked = () => {
    setLike(false);
    alert("Item has been removed from the Watchlist")
    handleDelete();
  }

  const addtoWatchList = async (listing) => {
    const res = await watchListsApi.addWatchList(
      { title, price, discount, userId, categoryId, description, buyerId, noOfBuyers, itemId, images }
    );
    alert("Item has been successfully added to Watchlist")
    if (!res.ok) {
      return alert('Could not save to Watchlist')
    };
  };

  const handleSubmit = async (listing) => {
    const res = await shoppingListsApi.addShoppingList(
      { title, price, discount, userId, categoryId, description, buyerId, noOfBuyers, itemId, images }
    );
    if (!res.ok) {
      return alert('Could not save the shoppinglists')
    };
  };
  const result = filterResultsByitemId(itemId);

  const handleDelete = async (itemId) => {
    const res = await watchListsApi.deleteWatchlist(
      { itemId }
    );

    if (!res.ok) {
      //return alert('item saved to watchlist')
    };
  };
  //========================================================

  const showNotifications = () => {
    Notifications.presentLocalNotificationAsync({
      title: "Congratulations",
      body: "Your order was successfully placed!",
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        vibrate: true,
      },
    });
  };

  const completedNotification = () => {
    Notifications.presentLocalNotificationAsync({
      title: "Congratulations",
      body: "GroupBuy deal is completed.",
    });
  };

  const groupDiscount = () => {
    Notifications.presentLocalNotificationAsync({
      title: "Congratulations",
      body: "Your GroupBuy discount has been activated!",
    });
  };

  const ifElse = () => {
    if ((result.length + 1) % listing.noOfBuyers != 0) {
      showNotifications();
      Payment();
    } else {
      showNotifications();
      Payment();
      groupDiscount();
      completedNotification();
    }
  };

  const watchlistNotification = () => {
    Notifications.presentLocalNotificationAsync({
      title: "Congratulations",
      body: "A group has been created for an item on your watchlist.",
    });
  };

  const wNotif = () => {
    if (result.length === 0) {
      liked();
      //setLike(true);
      //addtoWatchList();
      watchlistNotification();
    } else {
      setLike(true);
      addtoWatchList();
    }
  };

  const urlImages = listing.images;



  return (
    <View>
      <ScrollView>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
        >
          <Image style={styles.image}
            preview={{ uri: listing.images[0].thumbnailUrl }}
            source={listing.images[0]}
            tint="light"
          //uri={listing.images[0].url} 
          />

          <View style={styles.detailsContainer}>

            <View style={styles.titleContainer}>
              <AppText style={styles.title}>{title}</AppText>

              {like === false ?
                (<TouchableOpacity onPress={wNotif}>
                  <Icon name="heart" iconColor={Color.white} backgroundColor={Color.black} />
                </TouchableOpacity>) : (<TouchableOpacity onPress={unLiked}>
                  <Icon name="heart" iconColor={Color.white} backgroundColor={Color.primary} />
                </TouchableOpacity>)
              }

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
              <View style={styles.joinButton}>
                {(result.length === 0) ? (<AppButton title="Create Group" onPress={ifElse} />)
                  :
                  (<AppButton title="Join now" onPress={ifElse} />)
                  //result.length > listing.noOfBuyers(<AppButton title="Deal is ON" onPress={Payment} />)
                }
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};


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

export default ListingDetails;
