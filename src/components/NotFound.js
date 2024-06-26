import React from "react";
import NoResults from "../assets/no-results.jpg";
import styles from "../styles/NotFound.module.css";
import Asset from "./Asset";

// Component displayed when a page is not found
const NotFound = () => {
  return (
    <div className={styles.NotFound}>
      <Asset
        src={NoResults}
        message={`Sorry, the page you're looking for doesn't exist`}
      />
    </div>
  );
};

export default NotFound;
