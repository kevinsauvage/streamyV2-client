import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import range from '../data/range';
import apiHelper from '../helpers/apiHelper';
import getParameters from '../helpers/getParameters';
import requests from '../helpers/requests';
import updateURLParameters from '../helpers/updateUrlParameters';

const START_YEAR = 1950;
const STEP_YEAR = 1;

const useFilter = (isBottom) => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState();
  const [loading, setLoading] = useState(true);
  const [years] = useState(() =>
    range(START_YEAR, new Date().getFullYear(), STEP_YEAR).map((item) => ({ name: `${item}` }))
  );

  const navigate = useNavigate();
  const { search } = useLocation();

  const checkQueryParameters = useCallback(
    (parametersToCheck) => {
      const searchParameters = new URLSearchParams(search);

      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries(parametersToCheck)) {
        const queryParameter = searchParameters.getAll(key);
        if (
          !queryParameter?.some(
            (parameter) => parameter?.toString()?.toLowerCase() === value?.toString()?.toLowerCase()
          )
        ) {
          return false;
        }
      }

      return true;
    },
    [search]
  );

  const pushNewParameters = useCallback(
    (parameters) => {
      const searchParameters_ = new URLSearchParams();

      Object.entries(parameters).forEach(([key, value]) =>
        searchParameters_.set(key, value.toString())
      );

      navigate({ pathname: window.location.pathname, search: searchParameters_.toString() });
    },
    [navigate]
  );

  const fetchData = useCallback(async () => {
    try {
      const {
        genresParameters,
        pageParameter,
        ratingsParameter,
        sortingParameter,
        typeParameter,
        yearsParameters,
      } = getParameters();

      if (!sortingParameter || !typeParameter) return;

      const baseUrl = requests.getFilters.url.replace(
        '{type}',
        typeParameter?.toLowerCase().split('-')[0]
      );

      const fullUrl = encodeURI(
        `${baseUrl}&page=${pageParameter}&sort_by=${sortingParameter}&vote_average.gte=${ratingsParameter}${
          typeParameter?.toLowerCase() === 'movie'
            ? '&primary_release_year='
            : '&first_air_date_year='
        }${yearsParameters?.length ? yearsParameters.join(',') : ''}&with_genres=${
          genresParameters?.length ? genresParameters.join(',') : ''
        }`
      );

      setLoading(true);
      const data = await apiHelper(fullUrl, undefined, 'get');
      setLoading(false);
      return data?.results;
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, []);

  const getGenres = useCallback(async () => {
    const type = new URLSearchParams(window.location.search).get('type');
    if (!type) return;

    const urls = {
      movie: requests.getMoviesGenre.url,
      'tv-series': requests.getSeriesGenre.url,
    };

    apiHelper(urls[type.toLowerCase()], undefined, 'get').then((data) => setGenres(data.genres));
  }, []);

  const navigateToDefault = useCallback(async () => {
    pushNewParameters({ page: '1', sorting: 'popularity.desc', type: 'movie' });
    getGenres();
    const response = await fetchData();
    setMovies(response);
  }, [fetchData, getGenres, pushNewParameters]);

  const resetForm = useCallback(
    async (newParameters) => {
      if (newParameters) {
        pushNewParameters(newParameters);
        getGenres();
        const response = await fetchData();
        setMovies(response);
        return;
      }
      navigateToDefault();
    },
    [pushNewParameters, navigateToDefault, fetchData, getGenres]
  );

  const handleFilterClick = useCallback(
    async (parameters) => {
      updateURLParameters(parameters, navigate);
      const response = await fetchData();
      setMovies(response);
    },
    [fetchData, navigate]
  );

  useEffect(() => {
    if (!isBottom) return;
    const pageParameter = new URLSearchParams(window.location.search).get('page');
    updateURLParameters({ page: (Number(pageParameter) + 1).toString() }, navigate);
    fetchData().then((response) => setMovies((previous) => [...previous, ...response]));
  }, [fetchData, isBottom, navigate]);

  useEffect(() => {
    const handleRender = async () => {
      const type = new URLSearchParams(window.location.search).get('type');

      if (type) {
        updateURLParameters({ page: '1' }, navigate);
        getGenres();
        const response = await fetchData();
        setMovies(response);
        return;
      }

      navigateToDefault();
    };
    handleRender();
  }, [fetchData, getGenres, navigate, navigateToDefault]);

  return {
    checkQueryParameters,
    genres,
    handleFilterClick,
    loading,
    movies,
    resetForm,
    type: new URLSearchParams(window.location.search).get('type'),
    years,
  };
};

export default useFilter;
