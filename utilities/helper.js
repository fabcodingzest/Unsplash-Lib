export const getNextPageNum = (lastPage, pages) => {
  const totalPages = lastPage.total_pages;
  const nextPage = pages.length + 1;
  return nextPage <= totalPages ? nextPage : undefined;
};

export const getRelatedCollectionData = (imageDetails) => {
  const relatedCollections = imageDetails?.related_collections;
  const haveRelatedCollections =
    relatedCollections && relatedCollections?.results.length > 0;
  const firstCollectionId = relatedCollections?.results[0]?.id;
  return haveRelatedCollections
    ? { haveRelatedCollections, firstCollectionId }
    : false;
};
