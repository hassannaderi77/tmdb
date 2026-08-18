import Link from "next/link";
import styles from "./SearchBanner.module.css";

export default function SearchBanner({ searchBanner }) {
  return (
    <>
      <div className={styles.items}>
        {searchBanner.map((item) => (
          <Link href={`/${item.type}/${item.id}`}>
            <div key={item.id} className={styles.item}>
              <div>
                <img src={item.fullPoster || "/images/poster404.png"} onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/poster404.png"
                }}  alt="" />
              </div>
              <div className={styles.detail}>
                <p>
                  {item.name || item.title}(
                  {item.release_date ? item.release_date.slice(0, 4) : "N/A"})
                </p>
                <div>
                  <div
                    className={styles.circle}
                    style={{
                      "--percentage": `${Math.round(item.vote_average * 10)}`,
                      "--hue": `${Math.round(item.vote_average * 10) * 1.2}`,
                    }}
                  >
                    <p>{Math.round(item.vote_average * 10)}%</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
