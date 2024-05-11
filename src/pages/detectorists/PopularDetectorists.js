import React from 'react'
import appStyles from "../../App.module.css";
import { Container } from 'react-bootstrap';

const PopularDetectorists = () => {
  return (
    <Container className={appStyles.Content}>
        <p>Most followed detectorists</p>
    </Container>
  );
};

export default PopularDetectorists