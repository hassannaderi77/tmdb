import Link from "next/link"
import styles from "./DataCart.module.css"

export default function DataCart({data}) {

    return(
<>
<div className={styles.trend}>
      <Link href={`/${data.type}/${data.id}`}>
        <div className={styles.card}>
          <img
            // src={
            //   data.poster_path
            //     ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
            //     : "/images/people.jpg"
            // }
            src="/images/poster404.png"
            alt=""
          />
          <div className={styles.rate}>
            <div
              className={styles.circle}
              style={{
                "--percentage": `${Math.round(data.vote_average * 10)}`,
                "--hue": `${Math.round(data.vote_average * 10) * 1.2}`,
              }}
            >
              <p>{Math.round(data.vote_average * 10)}%</p>
            </div>
          </div>
          <h4>{data.title || data.name}</h4>
          <p>{data.release_date || data.first_air_date}</p>
        </div>
      </Link>
    </div>
</>
    )
}