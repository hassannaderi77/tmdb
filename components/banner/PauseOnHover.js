import Slider from "react-slick";
import styles from "./PauseOnHover.module.css";

export default function PauseOnHover({ dataUpComing }) {
  const settings = {
    focusOnSelect: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };

  return (
    <div className={styles.contain}>
      <p
        style={{ textAlign: "center", marginBottom: "20px", fontSize: "20px" }}
      >
        Coming SoOn ...
      </p>
      <div className="slider-container">
        <Slider {...settings}>
          {dataUpComing.map((item) => (
            <div key={item.id} className={styles.slide}>
              <img
                src={item.fullBackdrop}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/poster404.png";
                }}
              />
              <p>{item.title || item.name}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
