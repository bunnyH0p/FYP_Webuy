import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import DeleteAction from "../componentJp/Delete";
import Screen from "../componentJp/Screen";
import ListItem from "../componentJp/ListItem";
import Separator from "../componentJp/Separator";


const intialMessages = [
    {
        id: 1,
        title: "T1fdfdsfasdfasdfadsfasdfadsfadsfasdf",
        description: 'D1sdfasdfasdfasdfadsfadsfasdfadsfadsfadfadf',
        image: require("../../assets/spiderUser.png")
    },
    {
        id: 2,
        title: "T1",
        description: 'D1',
        image: require("../../assets/spiderUser.png")
    }
]


function MessageScreen() {
    const [messages, setMessages] = useState(intialMessages);
    const [refreshing, setRefreshing] = useState(false);

    const handleDelete = message => {
        setMessages(messages.filter(msg => msg.id !== message.id));
    }

    return (
        <Screen>
            <FlatList
                data={messages}
                keyExtractor={message => message.id.toString()}
                renderItem={({ item }) => (
                    <ListItem
                        title={item.title}
                        subTitle={item.description}
                        image={item.image}
                        onPress={() => console.log("message selected", item)}
                        renderRightActions={() =>
                            <DeleteAction onPress={() => handleDelete(item)}
                            />} />
                )}
                ItemSeparatorComponent={Separator}
                refreshing={refreshing}
                onRefresh={() => {
                    setMessages([
                        {
                            id: 2,
                            title: "T2",
                            description: 'D2',
                            image: require("../../assets/spiderUser.png")
                        },
                    ]);
                }}
            />
        </Screen>
    );
}



export default MessageScreen;