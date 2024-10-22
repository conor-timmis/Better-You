import React from 'react';
import { Rating } from 'react-simple-star-rating';
import styles from '../styles/StarRating.module.css';

const StarRating = ({ rating, setRating }) => {
  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <div className={styles.ratingContainer}>
      <h2 className={styles.ratingLabel}>Your Rating</h2>
      <Rating
        onClick={handleRating}
        ratingValue={rating}
        className={styles.stars}
        size={24}
        fillColor="orange"
        emptyColor="gray"
      />
      <p className={styles.ratingValue}>{Math.round(rating / 20) || 0} Stars</p>
    </div>
  );
};

export default StarRating;
