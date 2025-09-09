export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!id) {
    return res.status(400).json({ error: "Movie ID is required" });
  }

  const apiKey = process.env.API_KEY;
  const baseImgUrl = "https://image.tmdb.org/t/p/w500";
  const urlMovie = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;
  const urlCasts = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`;

  try {

    const responseMovie = await fetch(urlMovie);
    const textMovie = await responseMovie.text();
    let dataMovie;

    try {
      dataMovie = JSON.parse(textMovie);
    } catch (err) {
      return res.status(500).json({ error: "Invalid JSON received from TMDB", raw: textMovie });
    }

    const responseCasts = await fetch(urlCasts);
    const textCasts = await responseCasts.text();
    let dataCasts;

    try {
      dataCasts = JSON.parse(textCasts);
    } catch (err) {
      return res.status(500).json({ error: "Invalid JSON received from TMDB (casts)", raw: textCasts });
    }

  
    const castsWithFullImages = (dataCasts.cast || []).map((actor) => ({
      ...actor,
      fullProfile: actor.profile_path ? `${baseImgUrl}${actor.profile_path}` : null
    }));

    const movieWithFullImagesAndCasts = {
      ...dataMovie,
      fullBackdrop: dataMovie.backdrop_path ? `${baseImgUrl}${dataMovie.backdrop_path}` : null,
      fullPoster: dataMovie.poster_path ? `${baseImgUrl}${dataMovie.poster_path}` : null,
      casts: castsWithFullImages
    };

    res.status(200).json(movieWithFullImagesAndCasts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data", details: error.message });
  }
}