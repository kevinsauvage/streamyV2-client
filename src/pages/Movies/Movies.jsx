import CarouselWrapper from '../../components/CarouselWrapper/CarouselWrapper';
import Container from '../../components/Container/Container';
import Slide from '../../components/Slide/Slide';
import requests from '../../helpers/requests';
import Page from '../../layouts/Page/Page';

const Movies = () => (
  <Page>
    <Slide url={requests.getTrendingMovies.url} />
    <Container>
      {Object.values(requests.movies).map((item) => (
        <CarouselWrapper url={item.url} title={item.title} type="movie" key={item.url} />
      ))}
    </Container>
  </Page>
);

export default Movies;
