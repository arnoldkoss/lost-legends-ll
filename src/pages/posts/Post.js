import React from 'react'
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Avatar from "../../components/Avatar";

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
      } = props;



  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;


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
    </Card>
  )
}

export default Post