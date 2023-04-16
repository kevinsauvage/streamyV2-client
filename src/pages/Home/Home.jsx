import Acordeon from '../../components/Acordeon/Acordeon';
import CarouselWrapper from '../../components/CarouselWrapper/CarouselWrapper';
import Container from '../../components/Container/Container';
import SLide from '../../components/Slide/Slide';
import requests from '../../helpers/requests';
import Page from '../../layouts/Page/Page';

const Home = () => (
  <Page>
    <SLide url={requests.Home.Trending.url} />
    <Acordeon url={requests.getUpcoming.url} title={requests.getUpcoming.title} type="movie" />
    <Container>
      {Object.values(requests.Home).map((item) => (
        <CarouselWrapper url={item.url} title={item.title} type={item?.type} key={item.url} />
      ))}
    </Container>
  </Page>
);

export default Home;
