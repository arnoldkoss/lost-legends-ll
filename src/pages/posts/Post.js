import React from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Avatar from "../../components/Avatar";
import { axiosRes, axiosReq } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

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
    location,
    era,
  } = props;

  // Get the current user from context
  const currentUser = useCurrentUser();
  // Check if the current user is the owner of the post
  const is_owner = currentUser?.username === owner;
  // Access the history object for navigation
  const history = useHistory();

  // Handle post edit
  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  // Handle post delete
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  // Handle like post
  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { post: id });
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

  // Handle add to wishlist
  const handleWishlist = async () => {
    try {
      const { data } = await axiosRes.post("/wishlist/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? {
                ...post,
                wishlists_count: post.wishlists_count + 1,
                wishlist_id: data.id,
              }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  // Handle add to favorites
  const handleFavorite = async () => {
    try {
      const { data } = await axiosRes.post("/favorites/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? {
                ...post,
                favorites_count: post.favorites_count + 1,
                favorite_id: data.id,
              }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  // Handle unlike post
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

  // Handle remove from wishlist
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

  // Handle remove from favorites
  const handleRemoveFavorite = async () => {
    try {
      await axiosRes.delete(`/favorites/${favorite_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? {
                ...post,
                favorites_count: post.favorites_count - 1,
                favorite_id: null,
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
            {is_owner && postPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && (
          <Card.Text className={styles.LeftAlignedText}>{content}</Card.Text>
        )}
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
              <i
                className={`fa-solid fa-clipboard-list ${styles.WlistOutline}`}
              />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to add posts to the Wishlist!</Tooltip>}
            >
              <i className="fa-solid fa-clipboard-list" />
            </OverlayTrigger>
          )}
          <span className={styles.Wlist}>{wishlists_count}</span>

          {favorite_id ? (
            <span onClick={handleRemoveFavorite}>
              <i className={`fa-solid fa-crown ${styles.Crown}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleFavorite}>
              <i className={`fa-solid fa-crown ${styles.CrownOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to mark posts as favorite!</Tooltip>}
            >
              <i className="fa-solid fa-crown" />
            </OverlayTrigger>
          )}
          <span className={styles.FavoritesCount}>{favorites_count}</span>
        </div>
        <hr />
        <div className="d-flex align-items-center justify-content-end">
          <span className={styles.smallText}>
            Found in {location}, dating back to the {era} era
          </span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;
