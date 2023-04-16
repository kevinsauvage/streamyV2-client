const updateURLParameters = (parameters, navigate) => {
  const searchParameters_ = new URLSearchParams(window.location.search);

  Object.entries(parameters).forEach(([key, value]) => {
    const existingValues = searchParameters_.getAll(key);
    if (existingValues.includes(value.toString())) {
      return searchParameters_.delete(key);
    }
    return searchParameters_.set(key, value.toString());
  });

  navigate({ pathname: window.location.pathname, search: searchParameters_.toString() });
};

export default updateURLParameters;
