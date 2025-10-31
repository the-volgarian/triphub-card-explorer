import React, { useEffect, useRef, useState } from "react";
import "./TripCard.scss";
import defaultImage from "../../assets/default.png";
import { unsplashOpt } from "../../utils/img";

function TripCard({ trip, onMoreInfo, index = 0, dimmed = false }) {
  const { name, image, description, rating } = trip;

  const isEmpty = !image || String(image).trim() === "";
  const baseSrc = isEmpty ? defaultImage : image;

  const isUnsplash =
    !isEmpty &&
    (() => {
      try {
        const u = new URL(baseSrc);
        return (
          u.hostname.includes("unsplash.com") ||
          u.hostname.includes("images.unsplash.com")
        );
      } catch {
        return false;
      }
    })();

  const optimizedSrc = isUnsplash ? unsplashOpt(baseSrc, 640, 70) : baseSrc;
  const srcSet = isUnsplash
    ? [
        unsplashOpt(baseSrc, 320, 70) + " 320w",
        unsplashOpt(baseSrc, 480, 70) + " 480w",
        unsplashOpt(baseSrc, 640, 70) + " 640w",
        unsplashOpt(baseSrc, 800, 70) + " 800w",
      ].join(", ")
    : undefined;

  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(isEmpty);
  const imgRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    setIsFallback(isEmpty);
  }, [optimizedSrc, isEmpty]);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) setLoading(false);
  }, [optimizedSrc]);

  const handleImageLoad = () => setLoading(false);
  const handleImageError = (e) => {
    if (!isFallback) {
      setIsFallback(true);
      e.currentTarget.onerror = null;
      e.currentTarget.removeAttribute("srcset");
      e.currentTarget.removeAttribute("sizes");
      e.currentTarget.src = defaultImage;
    } else {
      setLoading(false);
    }
  };

  const renderStars = () => {
    const full = Math.round(rating ?? 0);
    return (
      <div className="trip-card__stars" aria-label={`Rating ${full} of 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`trip-card__star ${i < full ? "trip-card__star--full" : ""}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onMoreInfo?.(trip);
    }
  };

  return (
    <article
      className={`trip-card ${dimmed ? "trip-card--dimmed" : ""}`}
      tabIndex="0"
      onClick={() => onMoreInfo?.(trip)}
      onKeyDown={handleKeyPress}
      role="button"
      aria-label={`More info about ${name}`}
    >
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
            src={optimizedSrc}
            {...(srcSet
              ? { srcSet, sizes: "(min-width: 1200px) 360px, (min-width: 768px) 33vw, 90vw" }
              : {})}
            alt={name}
            className="trip-card__image"
            loading={index < 6 ? "eager" : "lazy"}
            fetchPriority={index < 6 ? "high" : "auto"}
            decoding="async"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          <span className="trip-card__glow" />
        </div>

        <div className="trip-card__content">
          <h3 className="trip-card__title">{name}</h3>
          {renderStars()}
          <p className="trip-card__description">{description}</p>
        </div>
      </div>
    </article>
  );
}

export default TripCard;
