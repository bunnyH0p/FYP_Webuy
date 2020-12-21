import client from "./client";

const endpoint = "/listings";

const getListings = () => client.get(endpoint);

const deleteMyListings = (id) => client.delete("/listings/:" + id);

const getMyListings = () => client.get("/my/listings");

const addListing = (listing, onUploadProgress) => {
  const data = new FormData();
  data.append('title', listing.title);
  data.append('price', parseInt(listing.price));
  data.append('noOfBuyers', parseInt(listing.noOfBuyers));
  data.append('discount', parseInt(listing.discount));
  data.append('userId', parseInt(listing.userId));
  data.append('categoryId', parseInt(listing.category.value));
  data.append('description', listing.description);

  //data.append('buyerId', listing.buyerId);
  //data.append('itemId', listing.itemId);
  //onUploadProgress

  //console.log(listing.images)
  //for (let i = 0; i < listing.images.length; i++) {
  //  data.append("images", listing.images[i])
  //}


  listing.images.forEach((image, index) =>
    data.append("images", {
      name: "image" + index,
      type: "image/jpeg",
      uri: image,
    })
  );

  if (listing.location)
    data.append('location', JSON.stringify(listing.location));

  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
}

export default {
  getListings,
  addListing,
  getMyListings,
  deleteMyListings
};
