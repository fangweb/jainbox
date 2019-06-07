export const wait = delay => new Promise(resolve => setTimeout(resolve, delay));

export const getPage = page => {
  const _page = Number(page);
  if (Number.isNaN(_page) || !Number.isInteger(_page)) {
    throw new Error('Not a page');
  } else {
    return _page;
  }
};
