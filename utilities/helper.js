export const getNextPageNum = (lastPage, pages) => {
  const totalPages = lastPage.total_pages;
  const nextPage = pages.length + 1;
  return nextPage <= totalPages ? nextPage : undefined;
};