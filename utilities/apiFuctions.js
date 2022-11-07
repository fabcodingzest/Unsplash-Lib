import api, { perPage } from "./api";

export const fetchCollectionImages = async (
  pageParam = 1,
  id = collectionId
) => {
  try {
    console.log(pageParam);
    const url = `/collections/${id}/photos`;
    const { data, headers } = await api.get(url, {
      params: { page: pageParam },
    });
    const total_pages = Math.ceil(parseInt(headers["x-total"]) / perPage);
    if (data.length === 0) {
      throw new Error("No Images Found");
    }
    return { data: data, total_pages };
  } catch (error) {
    console.log(error.data);
    throw new Error(error);
  }
};

export const fetchSearchImages = async (pageParam, query) => {
  try {
    const url = `/search/photos`;
    const { data } = await api.get(url, {
      params: {
        query,
        page: pageParam,
      },
    });

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
      const url = `/photos/${id}`;
      const { data } = await api.get(url);
      return data;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
