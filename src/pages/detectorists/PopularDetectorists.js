import React, { useEffect, useState } from "react";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { Container } from 'react-bootstrap';
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";


const PopularDetectorists = ({ mobile }) => {
    const [detectoristData, setDetectoristData] = useState({
        // we will use the pageProfile later!
        pageDetectorist: { results: [] },
        popularDetectorists: { results: [] },
      });

    const { popularDetectorists } = detectoristData;
    const currentUser = useCurrentUser();
    
    useEffect(() => {
        const handleMount = async () => {
          try {
            const { data } = await axiosReq.get(
              "/detectorists/?ordering=-followers_count"
            );
            setDetectoristData((prevState) => ({
              ...prevState,
              popularDetectorists: data,
            }));
          } catch (err) {
            console.log(err);
          }
        };
    
        handleMount();
      }, [currentUser]);


  return (
    <Container className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}>
        {popularDetectorists.results.length ? (
        <>
        <p>Most followed detectorists</p>
        {mobile ? (
            <div className="d-flex justify-content-around">
                {popularDetectorists.results.slice(0,4).map((detectorist) => (
            <p key={detectorist.id}>{detectorist.owner}</p>
          ))}
            </div>
        ) : (
            popularDetectorists.results.map((detectorist) => (
                <p key={detectorist.id}>{detectorist.owner}</p>
              ))
        )}
        
          </>
          ) : (
            <Asset spinner />
          )}
    </Container>
  );
};

export default PopularDetectorists