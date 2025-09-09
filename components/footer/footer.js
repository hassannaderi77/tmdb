import styles from "./footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.logo}>
        <img src="/images/footer.svg" alt="" />
        <h2>Developed By Hassan</h2>
      </div>
      <div className={styles.box}>
        <h2>THE BASICS</h2>
        <h5>About TMDB</h5>
        <h5>Contact Us</h5>
        <h5>Support Forums</h5>
        <h5>API Documentation</h5>
        <h5>System Status</h5>
      </div>
      <div className={styles.box}>
        <h2>GET INVOLED</h2>
        <h5>Contribtion Bible</h5>
        <h5>Add New Movie</h5>
        <h5>Add New TV Show</h5>
      </div>
      <div className={styles.box}>
        <h2>COMMUNITY</h2>
        <h5>Guidelines</h5>
        <h5>Discussions</h5>
        <h5>Leaderboard</h5>
      </div>
      <div className={styles.box}>
        <h2>LEGAL</h2>
        <h5>TErms of Use</h5>
        <h5>API Terms of Use</h5>
        <h5>Privacy Policy</h5>
        <h5>DMCA Policy</h5>
      </div>
    </div>
  );
}
