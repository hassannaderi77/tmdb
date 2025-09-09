export default async function handler(req, res) {
  if (req.method == "GET") {
    const apiKey = process.env.API_KEY;
    const baseImgUrl = "https://image.tmdb.org/t/p/w500";

    const urlTV = `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=en-US&page=1`;
    const urlPopularTv = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`;
    const airingTodayUrl = `https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}&language=en-US&page=1`

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
      const [ tvRes , popularTvRes, airingTodayRes] = await Promise.all([
        fetch(urlTV),
        fetch(urlPopularTv),
        fetch(airingTodayUrl)
      ]);

      const [ tvShows , popularTv, airingToday] = await Promise.all([
        tvRes.json(),
        popularTvRes.json(),
        airingTodayRes.json(),
      ]);


      res.status(200).json({
        tvShows: addFullImg(tvShows),
        popularTv: addFullImg(popularTv),
        airingToday: addFullImg(airingToday),
      });

    } catch (error) {
      res.status(500).json({ error: "Failed to fetch data" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
