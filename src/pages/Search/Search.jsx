import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Container from '../../components/Container/Container';
import Grid from '../../components/Grid/Grid';
import MovieCard from '../../components/MovieCard/MovieCard';
import apiHelper from '../../helpers/apiHelper';
import requests from '../../helpers/requests';
import updateURLParameters from '../../helpers/updateUrlParameters';
import useIsBottom from '../../hooks/useIsBottom';
import Page from '../../layouts/Page/Page';

const Search = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const isBottom = useIsBottom();
  const [searchParameters] = useSearchParams();
  const [query, setQuery] = useState();

  useEffect(() => {
    setQuery(searchParameters.get('query'));
  }, [searchParameters]);

  const fetchData = useCallback(async () => {
    if (!query) return;
    const page = new URLSearchParams(window.location.search).get('page') || 1;
    const data = await apiHelper(
      `${requests.searchMulti.url}&query=${query}&page=${page}`,
      undefined,
      'get'
    );
    if (!data?.results) return;
    return data.results.filter((item) => item.media_type === 'movie' || item.media_type === 'tv');
  }, [query]);

  const handleGetMore = useCallback(async () => {
    const page = new URLSearchParams(window.location.search).get('page') || 1;
    updateURLParameters({ page: Number(page) + 1 }, navigate);
    const data = await fetchData();
    if (data) setItems((previous) => [...previous, ...data]);
  }, [fetchData, navigate]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      if (data) setItems(data);
    };
    getData();
  }, [fetchData]);

  useEffect(() => {
    if (isBottom) handleGetMore();
  }, [isBottom, handleGetMore]);

  return (
    <Page>
      <Container>
        <Grid>
          {items.map((item) => (
            <MovieCard key={item.id} movie={item} />
          ))}
        </Grid>
      </Container>
    </Page>
  );
};

export default Search;
