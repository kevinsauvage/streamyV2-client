import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CarouselWrapper from '../../components/CarouselWrapper/CarouselWrapper';
import Container from '../../components/Container/Container';
import ModalTrailer from '../../components/ModalTrailer/ModalTrailer';
import PlayBanner from '../../components/PlayBanner/PlayBanner';
import PlayDetails from '../../components/PlayDetails/PlayDetails';
import { UserContext } from '../../context/UserContext';
import apiHelper from '../../helpers/apiHelper';
import requests from '../../helpers/requests';
import { stopScroll, unstopScroll } from '../../helpers/scroll';
import Page from '../../layouts/Page/Page';

const Play = () => {
  const { id, type } = useParams();
  const [movie, setMovie] = useState();
  const [trailer, setTrailer] = useState();
  const [loading, setLoading] = useState(true);
  const { addToMovieList, removeFromMovieList, userMovies } = useContext(UserContext);
  const navigate = useNavigate();

  const recommendationUrls = {
    movie: requests.getRecommendationMovie.url.replace('{id}', id),
    show: requests.getRecommendationShow.url.replace('{id}', id),
  };

  const similarUrls = {
    movie: requests.getSimilarMovie.url.replace('{id}', id),
    show: requests.getSimilarShow.url.replace('{id}', id),
  };

  const playTrailer = () => {
    const videooInfo = movie.videos.results.find((item) => item?.type === 'Trailer');
    setTrailer(videooInfo);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!id && !type) return;

    const slugUrl = {
      movie: requests.getMovieById.url.replace('{id}', id),
      show: requests.getShowById.url.replace('{id}', id),
      tv: requests.getShowById.url.replace('{id}', id),
    };

    const url = slugUrl[type];

    if (url) {
      setLoading(true);
      apiHelper(url, undefined, 'get')
        .then((data) => setMovie(data))
        .catch(() => navigate('/'))
        .finally(() => setLoading(false));
    }
  }, [id, navigate, type]);

  useEffect(() => {
    if (trailer) stopScroll();
    else unstopScroll();
  }, [trailer]);

  return (
    <div className="Play">
      <Page loading={loading}>
        <PlayBanner movie={movie} playTrailer={playTrailer} />
        <Container>
          <PlayDetails
            addToMovieList={addToMovieList}
            id={id}
            movie={movie}
            playTrailer={playTrailer}
            removeFromMovieList={removeFromMovieList}
            type={type}
            userMovies={userMovies}
          />
          <div>
            <CarouselWrapper url={similarUrls[type]} title={`Similar ${type}`} type={type} />
            <CarouselWrapper url={recommendationUrls[type]} title="Recommendations" type={type} />
          </div>
        </Container>
      </Page>
      {trailer && <ModalTrailer setTrailer={setTrailer} trailer={trailer} />}
    </div>
  );
};

export default Play;
