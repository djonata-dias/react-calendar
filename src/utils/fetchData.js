const fetchApi = (url, params) => {
  return (
    fetch(url, params)
      .then((response) => response)
      .then((data) => data.json())
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err))
  );
};

export default fetchApi;
