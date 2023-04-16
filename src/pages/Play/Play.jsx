import { useContext, useEffect, useState } from 'react';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { BsPlayFill } from 'react-icons/bs';
import { FaPhotoVideo } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import { MdRemoveCircleOutline } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';

import CarouselWrapper from '../../components/CarouselWrapper/CarouselWrapper';
import Container from '../../components/Container/Container';
import CreditBox from '../../components/CreditBox/CreditBox';
import YoutubeEmbed from '../../components/YoutubeEmbed/YoutubeEmbed';
import { UserContext } from '../../context/UserContext';
import apiHelper from '../../helpers/apiHelper';
import extractYearFromDate from '../../helpers/extractYearFromDate';
import requests, { image } from '../../helpers/requests';
import { stopScroll, unstopScroll } from '../../helpers/scroll';
import PlaceholderImage from '../../images/placeholder.png';
import Page from '../../layouts/Page/Page';

import './Play.scss';

const Play = () => {
  const { id, type } = useParams();
  const [movie, setMovie] = useState();

  const [trailer, setTrailer] = useState();
  const [loading, setLoading] = useState(true);
  const { addToMovieList, removeFromMovieList, userMovies } = useContext(UserContext);
  const navigate = useNavigate();

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
        .then((data) => {
          setLoading(false);
          setMovie(data);
        })
        .catch(() => {
          setLoading(false);
          navigate('/');
        });
    }
  }, [id, navigate, type]);

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
    if (trailer) stopScroll();
    else unstopScroll();
  }, [trailer]);

  return (
    <div className="Play">
      <Page loading={loading}>
        <div className="Play__banner">
          <img
            className="Play__banner-image"
            src={`${image.url.w1280}${movie?.backdrop_path}`}
            alt={movie?.original_title || movie?.original_name}
          />
          <Container>
            <div className="Play__banner-button">
              <button type="button" className="Play__banner-button-icon" onClick={playTrailer}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                  <polygon points="40,30 65,50 40,70" />
                </svg>
              </button>
              <p>Play Trailer</p>
            </div>
          </Container>
        </div>
        <Container>
          <div className="Play__details">
            <img
              className="Play__detailsImg"
              src={movie?.poster_path ? `${image.url.w500}${movie?.poster_path}` : PlaceholderImage}
              alt={movie?.original_title || movie?.original_name}
              width="185"
              height="278"
            />

            <div className="Play__detail">
              <div className="Play__detail-wrapper">
                <h6 className="Play__title">
                  {movie?.name || movie?.original_title || movie?.original_name}
                </h6>
                <p className="Play__tagline">
                  <i>{movie?.tagline}</i>
                </p>
                <div className="Play__row">
                  <p className="Play__release">
                    {extractYearFromDate(movie?.release_date) ||
                      extractYearFromDate(movie?.first_air_date)}
                  </p>
                  <p className="Play__average">
                    <span>{Math.ceil(movie?.vote_average.toFixed(2))}</span> / 10
                  </p>
                  {(movie?.media_type || type) && (
                    <p className="Play__type">
                      {movie?.media_type === 'tv' ? 'show' : type || movie?.media_type}
                    </p>
                  )}
                </div>
                <div className="Play__genres">
                  {movie?.genres?.map((item) => (
                    <p key={item.name} className="Play__genre">
                      {item.name}
                    </p>
                  ))}
                </div>
                <p className="Play__overview">{movie?.overview}</p>
                <CreditBox credits={movie?.credits} />
              </div>

              <div className="Play__btns">
                <button type="button" className="Play__btn" onClick={playTrailer}>
                  <BsPlayFill /> Play Trailer
                </button>

                {userMovies &&
                movie &&
                userMovies.map((item) => item.movie?.id).includes(movie.id) ? (
                  <button
                    type="button"
                    className="Play__btn"
                    onClick={() => removeFromMovieList(movie)}
                  >
                    <MdRemoveCircleOutline />
                    watch list
                  </button>
                ) : (
                  <button
                    type="button"
                    className="Play__btn"
                    onClick={() => addToMovieList(movie, type)}
                  >
                    <IoMdAdd />
                    watch List
                  </button>
                )}
                <Link to={`/${type}/${id}/comment`} state={{ type }}>
                  <button type="button" className="Play__btn">
                    <FaPhotoVideo /> Comments
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <CarouselWrapper url={similarUrls[type]} title={`Similar ${type}`} type={type} />
            <CarouselWrapper url={recommendationUrls[type]} title="Recommendations" type={type} />
          </div>
        </Container>
      </Page>
      {trailer && (
        <div className="Play__trailer">
          <button type="button" className="Play__closeTrailer" onClick={() => setTrailer()}>
            <AiOutlineCloseSquare />
          </button>
          <YoutubeEmbed embedId={trailer.key} />
        </div>
      )}
    </div>
  );
};

export default Play;
