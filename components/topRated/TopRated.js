import Link from "next/link";
import styles from "./TopRated.module.css";



export default function TopRated({
  poster_path,
  title,
  name,
  release_date,
  first_air_date,
  vote_average,
  id,
  type
}) {
  return (
    <div className={styles.trend}>
      <Link href={`/${type}/${id}`}>
        <div className={styles.card}>
          <img
          src="/images/poster404.png"
            // src={
            //   poster_path
            //     ? `https://image.tmdb.org/t/p/w500${poster_path}`
            //     : "/images/people.jpg"
            // }
            alt=""
          />
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
          <h4>{title || name}</h4>
          <p>{release_date || first_air_date}</p>
        </div>
      </Link>
    </div>
  );
}
