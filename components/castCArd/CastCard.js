import styles from "./CastCard.module.css";

export default function CastCard({ casts }) {
  return (
    <div className={styles.dataa}>
      {casts?.map((cast) => (
        <div key={cast.cast_id} className={styles.card}>
          <img src={cast.fullProfile || "/fallback.png"} alt={cast.name} onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/images/poster404.png"
          }} />
          <h5>{cast.character}</h5>
          <p>{cast.name}</p>
        </div>
      ))}
    </div>
  );
}