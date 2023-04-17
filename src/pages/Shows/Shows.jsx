import BannerSlider from '../../components/BannerSlider/BannerSlider';
import CarouselWrapper from '../../components/CarouselWrapper/CarouselWrapper';
import Container from '../../components/Container/Container';
import requests from '../../helpers/requests';
import Page from '../../layouts/Page/Page';

const Shows = () => (
  <Page>
    <BannerSlider url={requests.getTrendingTvShow.url} />
    <Container>
      {Object.values(requests.series).map((item) => (
        <CarouselWrapper url={item.url} title={item.title} type="show" key={item.url} />
      ))}
    </Container>
  </Page>
);

export default Shows;
