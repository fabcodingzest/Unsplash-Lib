import axios from "axios";

export const baseUrl = process.env.NEXT_PUBLIC_UNSPLASH_URL;
export const clientId = process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID;
export const collectionId = process.env.NEXT_PUBLIC_UNSPLASH_COLLECTION_ID;
export const perPage = 15;

export default axios.create({
  baseURL: baseUrl,
  params: {
    client_id: clientId,
    per_page: perPage,
  },
});
