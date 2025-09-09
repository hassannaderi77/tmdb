import { useState } from "react";
import styles from "./SearchList.module.css";
import { IoMdCloseCircle } from "react-icons/io";

export default function SearchList({ closeHandler, searchBanner }) {
  console.log(searchBanner);

  return (
    <div className={styles.container}>
      <IoMdCloseCircle onClick={closeHandler} size={30} />
      {searchBanner.map((item) => (
        <div className={styles.trend}>
            <div className={styles.card}>
          <img
            src={
              item.poster_path
                ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                : "/images/people.jpg"
            }
            alt=""
          />
          <div className={styles.rate}>
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
          <h4>{item.title || item.name}</h4>
          <p>{item.release_date || item.first_air_date}</p>
        </div>
        </div>
      ))}
    </div>
  );
}
