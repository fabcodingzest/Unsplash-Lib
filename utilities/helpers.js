const baseUrl = process.env.NEXT_PUBLIC_UNSPLASH_URL;
const clientId = process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID;
const collection = process.env.NEXT_PUBLIC_UNSPLASH_COLLECTION_ID;
const perPage = 15;

export const getNextPageNum = (lastPage, pages) => {
  const totalPages = lastPage.total_pages;
  const nextPage = pages.length + 1;
  return nextPage <= totalPages ? nextPage : undefined;
};

export const fetchCollectionImages = async ({ pageParam = 1 }) => {
  try {
    const url = `${baseUrl}/collections/${collection}/photos/?client_id=${clientId}&page=${pageParam}&per_page=${perPage}`;
    const res = await fetch(url);
    const results = await res.json();
    const total_pages = parseInt(res.headers.get("x-total")) / perPage;
    if (data.results.length === 0) {
      throw new Error("No Images Found");
    }
    return { data: results, total_pages };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const fetchSearchImages = async (pageParam, query) => {
  try {
    console.log(pageParam);
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
