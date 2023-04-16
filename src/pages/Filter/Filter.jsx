import Container from '../../components/Container/Container';
import Filters from '../../components/Filters/Filters';
import Grid from '../../components/Grid/Grid';
import MediumMovieCard from '../../components/MediumMovieCard/MediumMovieCard';
import Title from '../../components/Title/Title';
import useFilter from '../../hooks/useFilter';
import useIsBottom from '../../hooks/useIsBottom';
import Page from '../../layouts/Page/Page';

const Filter = () => {
  const isBottom = useIsBottom();

  const { resetForm, movies, handleFilterClick, years, checkQueryParameters, genres, type } =
    useFilter(isBottom);

  return (
    <Page>
      <Container>
        <Title title="FILTER" />
        <Filters
          checkQueryParameters={checkQueryParameters}
          genres={genres}
          handleFilterClick={handleFilterClick}
          resetForm={resetForm}
          years={years}
        />
        <Grid>
          {movies.length > 0 &&
            movies.map((movie) => (
              <MediumMovieCard
                key={movie.id}
                movie={movie}
                type={type?.split('-')[0].toLowerCase()}
              />
            ))}
        </Grid>
      </Container>
    </Page>
  );
};

export default Filter;
