import Link from "next/link";
import styles from "./navbar.module.css";
import { useRouter } from "next/router";

export default function Navbar() {
  const route = useRouter();
  console.log(route);

  return (
    <div className={styles.navbar}>
      <img src="/images/tmdb.svg" alt="tmdb logo" className={styles.tmdb} />
      <div className={styles.menu}>
        <Link href="/">
          <span className={route.pathname === "/" ? styles.active : ""}>
            Home
          </span>
        </Link>

        <Link href="/movie">
          <span className={route.pathname === "/movie" ? styles.active : ""}>
            Movies
          </span>
        </Link>

        <Link href="/tv">
          <span className={route.pathname === "/tv" ? styles.active : ""}>
            Tv Shows
          </span>
        </Link>
      </div>
    </div>
  );
}
