import React from 'react'
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Avatar from "../../components/Avatar";
import { axiosRes, axiosReq } from "../../api/axiosDefaults";

const Post = (props) => {
    const {
        id,
        owner,
        detectorist_id,
        detectorist_image,
        comments_count,
        likes_count,
        like_id,
        wishlists_count,
        wishlist_id,
        favorites_count,
        favorite_id,
        title,
        content,
        image,
        updated_at,
        postPage,
        setPosts,
      } = props;



  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { post:id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleWishlist = async () => {
    try {
      const { data } = await axiosRes.post("/wishlist/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveWishlist = async () => {
    try {
      await axiosReq.delete(`/wishlist/${wishlist_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? {
                ...post,
                wishlists_count: post.wishlists_count - 1,
                wishlist_id: null,
              }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <Card className={styles.Post}>
        <Card.Body>
            <Media className="align-items-center justify-content-between">
                <Link to={`/detectorists/${detectorist_id}`}>
                <Avatar src={detectorist_image} height={55} />
                {owner}

                </Link>
                <div className="d-flex align-items-center">
                <span>{updated_at}</span>
               {is_owner && postPage && "..."}
          </div>
            </Media>
        </Card.Body>
        <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
  {title && <Card.Title className="text-center">{title}</Card.Title>}
  {content && <Card.Text>{content}</Card.Text>}
  <div className={styles.PostBar}>
    {is_owner ? (
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>You can't like your own post!</Tooltip>}
      >
        <i className="far fa-heart" />
      </OverlayTrigger>
    ) : like_id ? (
      <span onClick={handleUnlike}>
        <i className={`fas fa-heart ${styles.Heart}`} />
      </span>
    ) : currentUser ? (
      <span onClick={handleLike}>
        <i className={`far fa-heart ${styles.HeartOutline}`} />
      </span>
    ) : (
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>Log in to like posts!</Tooltip>}
      >
        <i className="far fa-heart" />
      </OverlayTrigger>
    )}
    <span className={styles.LikesCount}>{likes_count}</span>
    <Link to={`/posts/${id}`}>
      <i className="far fa-comments" />
    </Link>
    <span className={styles.CommentsCount}>{comments_count}</span>

    {wishlist_id ? (
      <span onClick={handleRemoveWishlist}>
        <i className={`fa-solid fa-clipboard-list ${styles.Wlist}`} />
      </span>
    ) : currentUser ? (
      <span onClick={handleWishlist}>
        <i className={`fa-solid fa-clipboard-list ${styles.WlistOutline}`} />
      </span>
    ) : (
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>Log in to add posts to the Wishlist!</Tooltip>}
      >
        <i className="fa-solid fa-clipboard-list" />
      </OverlayTrigger>
      
    )}
    {wishlists_count}
  </div>
</Card.Body>
    </Card>
  )
}

export default Post