export default async function handler(req, res) {
  if (req.method == "GET") {
    const apiKey = process.env.API_KEY;
    const baseImgUrl = "https://image.tmdb.org/t/p/w500";

    const urlMovies = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;
    const urlTV = `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=en-US&page=1`;
    const urlUpComing = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`;
    const urlPopularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
    const urlPopularTv = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`;

    // تابع برای اضافه کردن fullPoster و fullBackdrop
    const addFullImg = (items) =>
      items.results.map((item) => ({
        ...item,
        fullBackdrop: item.backdrop_path
          ? `${baseImgUrl}${item.backdrop_path}`
          : null,
        fullPoster: item.poster_path
          ? `${baseImgUrl}${item.poster_path}`
          : null,
      }));

    try {
      const [moviesRes, tvRes, upComingRes , popularMoviesRes, popularTvRes] = await Promise.all([
        fetch(urlMovies),
        fetch(urlTV),
        fetch(urlUpComing),
        fetch(urlPopularMovies),
        fetch(urlPopularTv)
      ]);

      const [movies, tvShows, upComings , popularMovies, popularTv] = await Promise.all([
        moviesRes.json(),
        tvRes.json(),
        upComingRes.json(),
        popularMoviesRes.json(),
        popularTvRes.json(),
      ]);


      res.status(200).json({
        movies: addFullImg(movies),
        tvShows: addFullImg(tvShows),
        upComings: addFullImg(upComings),
        popularMovies: addFullImg(popularMovies),
        popularTv: addFullImg(popularTv),
      });

    } catch (error) {
      res.status(500).json({ error: "Failed to fetch data" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
