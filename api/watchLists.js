import client from "./client";

const endpoint = "/watchLists";

const getWatchLists = () => client.get(endpoint);

const deleteWatchlist = (id) => client.delete("/watchLists/:" + id);

//title,price,noOfBuyers,discount,userId,categoryId,description,buyerId
const addWatchList = (listing) => {
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



    /*
    for (let i = 0; i < listing.images.length; i++) {
        data.append('images',
            {
                name: "image",
                type: "image/jpeg",
                uri: listing.images.uri,
            }
        )
    }
    */
    /*
        listing.images.forEach((image, index) =>
            data.append("images", {
                name: "image" + index,
                type: "image/jpeg",
                uri: image,
            }
            )
        );
    */

    /*
        if (listing.location)
            data.append('location', JSON.stringify(listing.location));
    */
    return client.post(endpoint, data)
}

export default {
    getWatchLists,
    addWatchList,
    deleteWatchlist,
};