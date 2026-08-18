import CastCard from "@/components/castCArd/CastCard";
import styles from "/styles/Movie.module.css";

export default function TvId({ Tv }) {
  const {
    fullPoster,
    title,
    name,
    release_date,
    vote_average,
    fullBackdrop,
    overview,
    genres,
  } = Tv;

  return (
    <>
      <div
        className={styles.container}
        // style={{ backgroundImage: `url(${fullBackdrop})` }}
        style={{backgroundImage: 'url(/images/banner404.png)'}}

      >
        <div>
          <img 
          // src={fullPoster}
          src="/images/banner404.png"
           alt="" />
        </div>
        <div className={styles.details}>
          <h1>
            {name || title} ({release_date ? release_date.slice(0, 4) : "N/A"})
          </h1>

          <div className={styles.rate}>
            <div
              className={styles.circle}
              style={{
                "--percentage": `${Math.round(vote_average * 10)}`,
                "--hue": `${Math.round(vote_average * 10) * 1.2}`,
              }}
            >
              <p>{Math.round(vote_average * 10)}%</p>
            </div>
          </div>

          <h5>Overview :</h5>
          <p>{overview}</p>
          <h5>
            Genres:{" "}
            {genres?.map((genre, index) => (
              <span style={{ fontSize: "12px" }} key={genre.id}>
                {genre.name}
                {index < genres.length - 1 && ", "}
              </span>
            ))}
          </h5>
        </div>
      </div>
      <CastCard casts={Tv.casts} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const res = await fetch(`${process.env.BASE_URL}/api/tv/${id}`);
    const data = await res.json();

    if (data.error) {
      return { notFound: true };
    }

    return {
      props: {
        Tv: data,
      },
    };
  } catch (err) {
    return { notFound: true };
  }
}

// pages/tv/[id].js
