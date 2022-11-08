import axios from "axios";

export const baseUrl = process.env.NEXT_PUBLIC_UNSPLASH_URL;
export const clientId = process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID;
export const collectionId = process.env.NEXT_PUBLIC_UNSPLASH_COLLECTION_ID;
export const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

export default axios.create({
  baseURL: baseUrl,
  params: {
    client_id: clientId,
  },
  headers: {
    Authorization: "Bearer " + token,
  },
});
