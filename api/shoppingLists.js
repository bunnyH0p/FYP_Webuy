import client from "./client";

const endpoint = "/shoppingLists";

const getShoppingLists = () => client.get(endpoint);

const deleteShoppingLists = (id) => client.delete(`/shoppingLists/:` + id);

//title,price,noOfBuyers,discount,userId,categoryId,description,buyerId
const addShoppingList = (listing) => {
    const data = new FormData();
    data.append('title', listing.title);
    data.append('price', listing.price);
    data.append('noOfBuyers', listing.noOfBuyers);
    data.append('discount', listing.discount);
    data.append('userId', listing.userId);
    data.append('categoryId', listing.categoryId);
    data.append('description', listing.description);
    data.append('buyerId', listing.buyerId);
    data.append('itemId', listing.itemId);

    return client.post(endpoint, data)
}

export default {
    getShoppingLists,
    addShoppingList,
    deleteShoppingLists
};