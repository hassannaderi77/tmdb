export default async function handler(req, res) {
  if (req.method == "GET") {
    const apiKey = process.env.API_KEY;
    const baseImgUrl = "https://image.tmdb.org/t/p/w500";

    const urlMovies = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;
    const urlUpComing = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`;
    const urlPopularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

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
      const [movieRes, upComingRes, popularRes] = await Promise.all([
        fetch(urlMovies),
        fetch(urlUpComing),
        fetch(urlPopularMovies),
      ]);

      const [movies, upComings, populars] = await Promise.all([
        movieRes.json(),
        upComingRes.json(),
        popularRes.json(),
      ]);

      res.status(200).json({
        movies: addFullImg(movies),
        upComings: addFullImg(upComings),
        populars: addFullImg(populars)
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch data" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
