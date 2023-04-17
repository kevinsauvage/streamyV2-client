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
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setQuery(searchParameters.get('query'));
  }, [searchParameters]);

  const fetchData = useCallback(async () => {
    try {
      if (!query) return;
      const page = new URLSearchParams(window.location.search).get('page') || 1;
      setLoading(true);
      const data = await apiHelper(
        `${requests.searchMulti.url}&query=${query}&page=${page}`,
        undefined,
        'get'
      );
      if (!data?.results) return;
      return data.results.filter((item) => item.media_type === 'movie' || item.media_type === 'tv');
    } catch (error_) {
      console.error(error_);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [query]);

  const handleGetMore = useCallback(async () => {
    const page = new URLSearchParams(window.location.search).get('page') || 1;
    updateURLParameters({ page: Number(page) + 1 }, navigate);
    const data = await fetchData();
    if (data) setItems((previous) => [...previous, ...data]);
  }, [fetchData, navigate]);

  useEffect(() => {
    const getData = async () => {
      updateURLParameters({ page: 1 }, navigate);

      const data = await fetchData();
      if (data) setItems(data);
    };
    getData();
  }, [fetchData, navigate]);

  useEffect(() => {
    if (isBottom) handleGetMore();
  }, [isBottom, handleGetMore]);

  if (error) return <p>Something went wrong...</p>;

  return (
    <Page>
      <Container>
        <Grid>
          {items.map((item) => (
            <MovieCard key={item.id} movie={item} />
          ))}
        </Grid>
      </Container>
      {loading && (
        <div className="loader" style={{ minHeight: '200px' }}>
          <div />
        </div>
      )}
    </Page>
  );
};

export default Search;
