import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import styles from "../../styles/DetectoristPage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import PopularDetectorists from "./PopularDetectorists";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useDetectoristData, useSetDetectoristData } from "../../contexts/DetectoristDataContext";
import { axiosReq } from "../../api/axiosDefaults";
import { Button, Image } from "react-bootstrap";

function DetectoristPage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const setDetectoristData = useSetDetectoristData();
  const { pageDetectorist } = useDetectoristData();
  const [detectorist] = pageDetectorist.results;
  const is_owner = currentUser?.username === detectorist?.owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageDetectorist }] = await Promise.all([
          axiosReq.get(`/detectorists/${id}/`),
        ]);
        setDetectoristData((prevState) => ({
          ...prevState,
          pageDetectorist: { results: [pageDetectorist] },
        }));
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setDetectoristData]);

  const mainDetectorist = (
    <>
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
        <Image
            className={styles.DetectoristImage}
            roundedCircle
            src={detectorist?.image}
          />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{detectorist?.owner}</h3>
          <Row className="justify-content-center no-gutters">
            <Col xs={3} className="my-2">
              <div>{detectorist?.posts_count}</div>
              <div>posts</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{detectorist?.followers_count}</div>
              <div>followers</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{detectorist?.following_count}</div>
              <div>following</div>
            </Col>
            
          </Row>
        </Col>
        <Col lg={3} className="text-lg-right">
        {currentUser &&
            !is_owner &&
            (detectorist?.following_id ? (
              <Button
                className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
                onClick={() => {}}
              >
                unfollow
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Black}`}
                onClick={() => {}}
              >
                follow
              </Button>
            ))}
        </Col>
        {detectorist?.content && <Col className="p-3">{detectorist.content}</Col>}
      </Row>
    </>
  );

  const mainDetectoristPosts = (
    <>
      <hr />
      <p className="text-center">Profile owner's posts</p>
      <hr />
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularDetectorists mobile />
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainDetectorist}
              {mainDetectoristPosts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularDetectorists />
      </Col>
    </Row>
  );
}

export default DetectoristPage;