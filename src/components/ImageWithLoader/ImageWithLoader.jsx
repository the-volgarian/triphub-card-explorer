import React, { useState, useRef, useEffect } from "react";
import "./TripCard.scss";
import defaultImage from "../../assets/default.png";

function TripCard({ trip, onMoreInfo }) {
  const { name, image, description } = trip;

  const imageSrc = image || defaultImage;

  const [loading, setLoading] = useState(true);
  const imgRef = useRef(null);

  useEffect(() => {
    setLoading(true);
  }, [imageSrc]);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setLoading(false);
    }
  }, [imageSrc]);

  const handleImageLoad = () => setLoading(false);

  const handleImageError = (e) => {
    if (e.target.src !== defaultImage) {
      e.target.src = defaultImage;
    }
    setLoading(false);
  };

  return (
    <div className="trip-card">
      <div className="trip-card__inner">
        <div className="trip-card__image-wrap">
          {loading && (
            <div className="trip-card__loader" aria-hidden="true">
              <span className="trip-card__dot" />
              <span className="trip-card__dot" />
              <span className="trip-card__dot" />
            </div>
          )}

          <img
            ref={imgRef}
            src={imageSrc}
            alt={name}
            onLoad={handleImageLoad}
            onError={handleImageError}
            className="trip-card__image"
            loading="lazy"
            decoding="async"
          />

          <span className="trip-card__glow" />
        </div>

        <div className="trip-card__content">
          <h3 className="trip-card__title">{name}</h3>
          <p className="trip-card__description">{description}</p>
          <button className="trip-card__button" onClick={() => onMoreInfo(trip)}>
            More Info
          </button>
        </div>
      </div>
    </div>
  );
}

export default TripCard;
