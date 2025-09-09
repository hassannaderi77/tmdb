import styles from "./index.module.css";

import DataCart from "@/components/dataCart/DataCart";
import { useState } from "react";

export default function Series({ allItems }) {
  const [dataList, setDataList] = useState(allItems);


  const handleInputChange = (e) => {
     const value = e.target.value;

    const normalizeText = (str = "") =>
      str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, " ")
        .replace(/[^\w\s]/g, "")
        .trim();

    const search = normalizeText(value);

    if (!search) {
      setDataList(allItems); // وقتی سرچ خالی شد، همه آیتم‌ها رو برگردون
      return;
    }

    const filtered = allItems.filter((item) => {
      const name = normalizeText(item.name || item.title || "");
      return name.includes(search); // سرچ دقیق‌تر
    });

    setDataList(filtered);
  };
  return (
    <>
      <div className={styles.banner}>
        <h1>Welcome.</h1>
        <h2>
          Millions of movies, TV shows and people to discover. Explore now.
        </h2>
        <form className={styles.search} onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search for movie, tv show ..."
            onChange={handleInputChange}
          />
        </form>
      </div>
      <div className={styles.container}>
        {dataList.map((item) => (
          <DataCart data={item} key={item.id} />
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/tv");
  const data = await res.json();

  const tvWithType = data.tvShows.map((item) => ({ ...item, type: "tv" }));
  const popularTvWithType = data.popularTv.map((item) => ({
    ...item,
    type: "tv",
  }));
  const airingTodayWithType = data.airingToday.map((item) => ({
    ...item,
    type: "tv",
  }));

  const allItems = [
    ...tvWithType,
    ...popularTvWithType,
    ...airingTodayWithType,
  ];
  return {
    props: {
      tvShows: tvWithType,
      popularTv: popularTvWithType,
      airingToday: airingTodayWithType,
      allItems,
    },
  };
}
// localhost:port/series
