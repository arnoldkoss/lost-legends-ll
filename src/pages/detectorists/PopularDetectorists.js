import React from "react";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useDetectoristData } from "../../contexts/DetectoristDataContext";
import Container from "react-bootstrap/Container";
import Detectorist from "./Detectorist";

const PopularDetectorists = ({ mobile }) => {
  // Get popular detectorists data from context
  const { popularDetectorists } = useDetectoristData();

  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      {popularDetectorists.results.length ? (
        <>
          <p>Most followed detectorists</p>
          {mobile ? (
            <div className="d-flex justify-content-around">
              {popularDetectorists.results.slice(0, 4).map((detectorist) => (
                <Detectorist
                  key={detectorist.id}
                  detectorist={detectorist}
                  mobile
                />
              ))}
            </div>
          ) : (
            popularDetectorists.results.map((detectorist) => (
              <Detectorist key={detectorist.id} detectorist={detectorist} />
            ))
          )}
        </>
      ) : (
        // Show a spinner while loading data
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularDetectorists;
