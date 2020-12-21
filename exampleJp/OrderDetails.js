import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import OrderList from '../componentJp/OrderLists';
import shoppingListsApi from "../api/shoppingLists";
import orderListsApi from "../api/orderLists";
import Screen from "../componentJp/Screen";
import Color from '../componentJp/Color';


function OrderDetailsScreen(props) {
    const [results, setResults] = useState([]);
    const [shoppingResults, setShoppingResults] = useState([]);

    const [refreshing, setRefreshing] = useState(false);


    const { user } = useAuth();
    const userId = user.userId;

    useEffect(() => {
        loadOrderLists();
        loadShoppingLists();
    }, []);

    const loadShoppingLists = async () => {
        const response = await shoppingListsApi.getShoppingLists();
        setShoppingResults(response.data);
    }

    const loadOrderLists = async () => {
        const response = await orderListsApi.getOListings();
        setResults(response.data);
    }

    const filterResultsByUserId = userId => {
        return results.filter(result => {
            return result.sellerId == userId;
        });
    };

    const filteredResult = filterResultsByUserId(userId);

    const res = [];
    for (let i = 0; i < filteredResult.length; i++) {
        for (let j = 0; j < shoppingResults.length; j++) {
            if (filteredResult[i].itemId == shoppingResults[j].itemId) {
                res.push(filteredResult[i])
            }
        }
    }
    //console.log(res.length)



    return (
        <Screen style={styles.screen}>

            <FlatList
                data={res}
                keyExtractor={(listing) => listing.id.toString()}
                renderItem={({ item }) => (
                    <OrderList
                        title={item.title}
                        firstName={item.lastName}
                        lastName={item.firstName}
                        email={item.email}
                        phoneNumber={item.phoneNumber}
                        addressLine1={item.addressLine1}
                        addressLine2={item.addressLine2}
                        city={item.city}
                        country={item.country}
                        postalCode={item.country}
                    />
                )}
                refreshing={refreshing}
                onRefresh={loadOrderLists}
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

export default OrderDetailsScreen;