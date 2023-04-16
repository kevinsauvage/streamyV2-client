const getParameters = () => {
  const { search } = window.location;
  const typeParameter = new URLSearchParams(search).get('type');
  const sortingParameter = new URLSearchParams(search).get('sorting') || 'popularity.desc';
  const pageParameter = new URLSearchParams(search).get('page') || '1';
  const ratingsParameter = new URLSearchParams(search).get('ratings') || '';
  const genresParameters = new URLSearchParams(search).getAll('genres');
  const yearsParameters = new URLSearchParams(search).getAll('years');

  return {
    genresParameters,
    pageParameter,
    ratingsParameter,
    sortingParameter,
    typeParameter,
    yearsParameters,
  };
};

export default getParameters;
