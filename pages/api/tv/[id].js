export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!id) {
    return res.status(400).json({ error: "TV ID is required" });
  }

  const apiKey = process.env.API_KEY;
  const baseImgUrl = "https://image.tmdb.org/t/p/w500";
  const urlTv = `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`;
  const urlCasts = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${apiKey}&language=en-US`;

  try {
    const responseTv = await fetch(urlTv);
    const dataTv = await responseTv.json();

    const responseCasts = await fetch(urlCasts);
    const dataCasts = await responseCasts.json();

    const castsWithFullImages = (dataCasts.cast || []).map(actor => ({
      ...actor,
      fullProfile: actor.profile_path ? `${baseImgUrl}${actor.profile_path}` : null
    }));

    const tvWithFullImagesAndCasts = {
      ...dataTv,
      fullBackdrop: dataTv.backdrop_path ? `${baseImgUrl}${dataTv.backdrop_path}` : null,
      fullPoster: dataTv.poster_path ? `${baseImgUrl}${dataTv.poster_path}` : null,
      casts: castsWithFullImages
    };

    res.status(200).json(tvWithFullImagesAndCasts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data", details: error.message });
  }
}
