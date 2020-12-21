import client from "./client";

const endpoint = "/orderLists";

const getOListings = () => client.get(endpoint);

const deleteOrderList = (id) => client.delete(`/orderLists/:` + id);

const getMyListings = () => client.get("/my/listings")

const addOListing = (listing, onUploadProgress) => {
    const data = new FormData();
    data.append('lastName', listing.lastName);
    data.append('firstName', listing.firstName);
    data.append('phoneNumber', listing.phoneNumber);
    data.append('email', listing.email);
    data.append('addressLine1', listing.addressLine1);
    data.append('addressLine2', listing.addressLine2);
    data.append('city', listing.city);
    data.append('postalCode', listing.postalCode);
    data.append('country', listing.country);
    data.append('title', listing.title);
    data.append('itemId', listing.itemId);
    data.append('sellerId', listing.sellerId);
    data.append('buyerId', listing.buyerId);
    data.append('categoryId', parseInt(listing.categoryId));


    //data.append('buyerId', listing.buyerId);
    //data.append('itemId', listing.itemId);
    //onUploadProgress

    //console.log(listing.images)
    //for (let i = 0; i < listing.images.length; i++) {
    //  data.append("images", listing.images[i])
    //}

    /*
    listing.images.forEach((image, index) =>
        data.append("images", {
            name: "image" + index,
            type: "image/jpeg",
            uri: image,
        })
    );


    if (listing.location)
        data.append('location', JSON.stringify(listing.location));
*/
    return client.post(endpoint, data, {
        onUploadProgress: (progress) =>
            onUploadProgress(progress.loaded / progress.total),
    });
}

export default {
    getOListings,
    addOListing,
    deleteOrderList,
    getMyListings,
};