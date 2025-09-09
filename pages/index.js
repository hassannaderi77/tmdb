import TopRated from "@/components/topRated/TopRated";
import styles from "./index.module.css";
import PauseOnHover from "@/components/banner/PauseOnHover";
import { useState } from "react";
import SearchBanner from "@/components/searchBanner/SearchBanner";
import SearchList from "@/components/searchList/SearchList";

export default function Home({
  movies,
  tvShows,
  upComings,
  popularMovies,
  popularTv,
  allItems,
}) {
  const [searching, setSearching] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchBanner, setSearchBanner] = useState([]);

  const SearchHandler = (e) => {
    e.preventDefault();
    setShowSearch(true);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearching(value);

    const normalizeText = (str = "") =>
      str
        .toLowerCase()
        .normalize("NFD") // جدا کردن accent ها مثل é -> e
        .replace(/[\u0300-\u036f]/g, "") // حذف accentها
        .replace(/\s+/g, " ") // یکی کردن فاصله‌های متعدد
        .replace(/[^\w\s]/g, "") // حذف علامت‌های غیرضروری
        .trim();

    const search = normalizeText(value);

    const filtred = allItems.filter((item) => {
      const name = normalizeText(item.name || item.title || "");

      if (!search) return false;

      // جستجوی چندکلمه‌ای (هر کلمه باید در name باشه)
      return search.split(" ").every((word) => name.includes(word));
    });

    setSearchBanner(filtred);
  };

  const closeHandler = () => {
    setShowSearch(false);
  };

  return (
    <div>
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
          <button type="button" onClick={SearchHandler}>
            Search
          </button>
        </form>
      </div>
      {searching && <SearchBanner searchBanner={searchBanner} />}

      {showSearch && (
        <SearchList closeHandler={closeHandler} searchBanner={searchBanner} />
      )}

      <PauseOnHover dataUpComing={upComings} />

      <div className={styles.data}>
        <p style={{ fontSize: "25px", fontWeight: "400" }}>Trendimg Movies</p>
        <div className={styles.dataa}>
          {movies.map((movie) => (
            <TopRated key={movie.id} {...movie} />
          ))}
        </div>
        <p style={{ fontSize: "25px", fontWeight: "400", marginTop: "100px" }}>
          Trending TvShows
        </p>
        <div className={styles.dataa}>
          {tvShows.map((tvShow) => (
            <TopRated key={tvShow.id} {...tvShow} />
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.BASE_URL}/api/topRated`);
  const data = await res.json();

  const moviesWithType = data.movies.map((item) => ({
    ...item,
    type: "movie",
  }));
  const tvWithType = data.tvShows.map((item) => ({ ...item, type: "tv" }));
  const upComingsWithType = data.upComings.map((item) => ({
    ...item,
    type: "movie",
  }));
  const popularMoviesWithType = data.popularMovies.map((item) => ({
    ...item,
    type: "movie",
  }));
  const popularTvWithType = data.popularTv.map((item) => ({
    ...item,
    type: "tv",
  }));

  const allItems = [
    ...moviesWithType,
    ...tvWithType,
    ...upComingsWithType,
    ...popularMoviesWithType,
    ...popularTvWithType,
  ];
  return {
    props: {
      movies: moviesWithType,
      tvShows: tvWithType,
      upComings: upComingsWithType,
      popularMovies: popularMoviesWithType,
      popularTv: popularTvWithType,
      allItems,
    },
  };
}
