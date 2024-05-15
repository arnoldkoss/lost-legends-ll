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
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../posts/Post";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.jpg";
import { DetectoristEditDropdown } from "../../components/MoreDropdown";

function DetectoristPage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [detectoristPosts, setDetectoristPosts] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const { id } = useParams();

  const {setDetectoristData, handleFollow, handleUnfollow } = useSetDetectoristData();
  const { pageDetectorist } = useDetectoristData();

  const [detectorist] = pageDetectorist.results;
  const is_owner = currentUser?.username === detectorist?.owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageDetectorist }, { data: detectoristPosts }] = await Promise.all([
          axiosReq.get(`/detectorists/${id}/`),
          axiosReq.get(`/posts/?owner__detectorist=${id}`),
        ]);
        setDetectoristData((prevState) => ({
          ...prevState,
          pageDetectorist: { results: [pageDetectorist] },
        }));
        setDetectoristPosts(detectoristPosts);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setDetectoristData]);

  const mainDetectorist = (
    <>
      {detectorist?.is_owner && <DetectoristEditDropdown id={detectorist?.id} />}
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
                onClick={() => handleUnfollow(detectorist)}
              >
                unfollow
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Black}`}
                onClick={() => handleFollow(detectorist)}
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
      <p className="text-center">{detectorist?.owner}'s posts</p>
      <hr />
      {detectoristPosts.results.length ? (
        <InfiniteScroll
          children={detectoristPosts.results.map((post) => (
            <Post key={post.id} {...post} setPosts={setDetectoristPosts} />
          ))}
          dataLength={detectoristPosts.results.length}
          loader={<Asset spinner />}
          hasMore={!!detectoristPosts.next}
          next={() => fetchMoreData(detectoristPosts, setDetectoristPosts)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`No results found, ${detectorist?.owner} hasn't posted yet.`}
        />
      )}
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