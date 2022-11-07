export const baseUrl = process.env.NEXT_PUBLIC_UNSPLASH_URL;
export const clientId = process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID;
export const collectionId = process.env.NEXT_PUBLIC_UNSPLASH_COLLECTION_ID;
export const perPage = 15;

export const fetchCollectionImages = async (
  pageParam = 1,
  id = collectionId
) => {
  try {
    console.log(pageParam);
    const url = `${baseUrl}/collections/${id}/photos/?client_id=${clientId}&page=${pageParam}&per_page=${perPage}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(response);
    const total_pages = Math.ceil(
      parseInt(response.headers.get("x-total")) / perPage
    );
    if (data.length === 0) {
      throw new Error("No Images Found");
    }
    return { data: data, total_pages };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const fetchSearchImages = async (pageParam, query) => {
  try {
    const url = `${baseUrl}/search/photos/?client_id=${clientId}&query=${query}&page=${pageParam}&per_page=${perPage}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.results.length === 0) {
      throw new Error("No Images Found");
    }
    return { data: data.results, total_pages: data.total_pages };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const fetchImageDetails = async (id) => {
  try {
    if (id) {
      const url = `${baseUrl}/photos/${id}/?client_id=${clientId}`;
      const res = await fetch(url);
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
