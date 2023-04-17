const API_KEY = process.env.REACT_APP_TMDB_KEY;

const requests = {
  Home: {
    PopularMovies: {
      title: 'Popular Movies',
      type: 'movie',
      url: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&include_adult=false`,
    },
    PopularTvShow: {
      title: 'Popular Tv Show',
      type: 'show',
      url: `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&include_adult=false`,
    },

    TopRatedMovies: {
      title: 'Top Rated Movies',
      type: 'movie',
      url: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&include_adult=false`,
    },
    TopRatedTvShow: {
      title: 'Top Rated Tv Show',
      type: 'show',
      url: `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&include_adult=false`,
    },
    Trending: {
      title: 'Trending',
      url: `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US&include_adult=false`,
    },
    nowPlayingMovies: {
      title: 'Movies Playing Now',
      type: 'movie',
      url: `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&include_adult=false`,
    },
  },
  getFilters: {
    url: `https://api.themoviedb.org/3/discover/{type}?api_key=${API_KEY}&language=en-US&include_adult=false&primary_release_date.lte=${Date.now()}&with_original_language=en`,
  },
  getLanguages: {
    url: `https://api.themoviedb.org/3/configuration/languages?api_key=${API_KEY}`,
  },
  getMovieById: {
    url: `https://api.themoviedb.org/3/movie/{id}?api_key=${API_KEY}&language=en-US&append_to_response=videos,credits`,
  },
  getMoviesGenre: {
    url: `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US&include_adult=false`,
  },
  getRecommendationMovie: {
    url: `https://api.themoviedb.org/3/movie/{id}/recommendations?api_key=${API_KEY}&language=en-US&include_adult=false`,
  },
  getRecommendationShow: {
    url: `https://api.themoviedb.org/3/tv/{id}/recommendations?api_key=${API_KEY}&language=en-US&include_adult=false`,
  },
  getSeriesGenre: {
    url: `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US&include_adult=false`,
  },
  getShowById: {
    url: `https://api.themoviedb.org/3/tv/{id}?api_key=${API_KEY}&language=en-US&append_to_response=videos,credits`,
  },
  getSimilarMovie: {
    url: `https://api.themoviedb.org/3/movie/{id}/similar?api_key=${API_KEY}&language=en-US&include_adult=false`,
  },
  getSimilarShow: {
    url: `https://api.themoviedb.org/3/tv/{id}/similar?api_key=${API_KEY}&language=en-US&include_adult=false`,
  },
  getTrendingMovies: {
    title: 'Trending Movies This Week',
    url: `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=en-US&include_adult=false`,
  },
  getTrendingTvShow: {
    title: 'Trending Show This Week',
    url: `https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}&language=en-US&include_adult=false`,
  },
  getUpcoming: {
    title: 'Upcoming',
    url: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&include_adult=false`,
  },

  movies: {
    ActionMovies: {
      title: 'Action',
      type: 'Movie',
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28&language=en-US&include_adult=false`,
    },
    Adventure: {
      title: 'Adventure',
      type: 'Movie',
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=12&language=en-US&include_adult=false`,
    },
    ComedyMovies: {
      title: 'Comedy',
      type: 'Movie',
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35&language=en-&include_adult=false`,
    },
    Documentary: {
      title: 'Documentary',
      type: 'Movie',
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=99&language=en-US&include_adult=false`,
    },
    DramaMovies: {
      title: 'Drama',
      type: 'Movie',
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=18&language=en-US&include_adult=false`,
    },
    Family: {
      title: 'Family',
      type: 'Movie',
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10751&language=en-US&include_adult=false`,
    },
    Fantasy: {
      title: 'Fantasy',
      type: 'Movie',
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=14&language=en-US&include_adult=false`,
    },
    History: {
      title: 'History',
      type: 'Movie',
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=36&language=en-US&include_adult=false`,
    },
    HorrorMovies: {
      title: 'Horror',
      type: 'Movie',
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27&language=en-US&include_adult=false`,
    },
    Music: {
      title: 'Music',
      type: 'Movie',
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10402&language=en-US&include_adult=false`,
    },
    MysteryMovies: {
      title: 'Mystery',
      type: 'Movie',
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=9648&language=en-US&include_adult=false`,
    },
    RomanceMovies: {
      title: 'Romance',
      type: 'Movie',
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10749&language=en-US&include_adult=false`,
    },
    ScienceFictionMovies: {
      title: 'Science Fiction',
      type: 'Movie',
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=878&language=en-US&include_adult=false`,
    },
    ThrillerMovies: {
      title: 'Thriller',
      type: 'Movie',
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=53&language=en-US&include_adult=false`,
    },
    TvMovie: {
      title: 'TV Movie',
      type: 'Movie',
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10770&language=en-US&include_adult=false`,
    },
    WesternMovies: {
      title: 'Western',
      type: 'Movie',
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=37&language=en-US&include_adult=false`,
    },
  },
  searchMulti: {
    url: `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&include_adult=false`,
  },
  series: {
    ActionTvShow: {
      title: 'Action & Adventure',
      url: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=10759&language=en-US&include_adult=false`,
    },
    ComedyTvShow: {
      title: 'Comedy',
      url: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=35&language=en-US&include_adult=false`,
    },
    Documentary: {
      title: 'Documentary',
      url: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=99&language=en-US&include_adult=false`,
    },
    DramaTvShow: {
      title: 'Drama',
      url: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=18&language=en-US&include_adult=false`,
    },
    Family: {
      title: 'Family',
      url: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=10751&language=en-US&include_adult=false`,
    },
    Fantasy: {
      title: 'Sci-Fi & Fantasy',
      url: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=10765&language=en-US&include_adult=false`,
    },
    MysteryTvShow: {
      title: 'Mystery',
      url: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=9648&language=en-US&include_adult=false`,
    },
    Reality: {
      title: 'Reality',
      url: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=10764&language=en-US&include_adult=false`,
    },
    WesternTvShow: {
      title: 'Western',
      url: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=37&language=en-US&include_adult=false`,
    },
    animation: {
      title: 'Animation',
      url: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=16&language=en-US&include_adult=false`,
    },
    crime: {
      title: 'Thriller',
      url: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=80&language=en-US&include_adult=false`,
    },
  },
};

export const image = {
  url: {
    original: 'https://image.tmdb.org/t/p/original',
    w1000: 'https://image.tmdb.org/t/p/w1000',
    w1280: 'https://image.tmdb.org/t/p/w1280',
    w185: 'https://image.tmdb.org/t/p/w185',
    w1920: 'https://image.tmdb.org/t/p/w1920',
    w300: 'https://image.tmdb.org/t/p/w300',
    w342: 'https://image.tmdb.org/t/p/w342',
    w500: 'https://image.tmdb.org/t/p/w500',
    w700: 'https://image.tmdb.org/t/p/w700',
    w780: 'https://image.tmdb.org/t/p/w780',
  },
};

export default requests;
