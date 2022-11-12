import api, { collectionId } from "./api";
const perPage = 15;

export const fetchCollectionImages = async (
  pageParam = 1,
  id = collectionId
) => {
  try {
    const { data, headers } = await api.get(`/collections/${id}/photos`, {
      params: { page: pageParam, per_page: perPage },
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
    const { data } = await api.get(`/search/photos`, {
      params: {
        query,
        page: pageParam,
        per_page: perPage,
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

export const likeImg = async (id) => {
  return await api.post(`/photos/${id}/like`);
};

export const unlikeImg = async (id) => {
  return await api.delete(`/photos/${id}/like`);
};
