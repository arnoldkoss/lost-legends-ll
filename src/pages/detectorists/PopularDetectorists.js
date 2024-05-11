import React, { useEffect, useState } from "react";
import appStyles from "../../App.module.css";
import { Container } from 'react-bootstrap';
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";


const PopularDetectorists = () => {
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
    <Container className={appStyles.Content}>
        <p>Most followed detectorists</p>
        {popularDetectorists.results.map((detectorist) => (
            <p key={detectorist.id}>{detectorist.owner}</p>
          ))}
    </Container>
  );
};

export default PopularDetectorists