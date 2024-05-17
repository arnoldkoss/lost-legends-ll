import React, { useState } from "react";
import Media from "react-bootstrap/Media";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
import CommentEditForm from "./CommentEditForm";

import styles from "../../styles/Comment.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";

const Comment = (props) => {
  const {
    detectorist_id,
    detectorist_image,
    owner,
    updated_at,
    content,
    id,
    setPost,
    setComments,
  } = props;

  // State to manage showing/hiding the edit form
  const [showEditForm, setShowEditForm] = useState(false);

  // Get the current user from context
  const currentUser = useCurrentUser();

  // Check if the current user is the owner of the comment
  const is_owner = currentUser?.username === owner;

  // Function to handle comment deletion
  const handleDelete = async () => {
    try {
      // Send a delete request to delete the comment
      await axiosRes.delete(`/comments/${id}/`);
      // Update the post's comments count
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));

      // Update the comments by filtering out the deleted comment
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {}
  };

  return (
    <>
      <hr />
      <Media>
        <Link to={`/detectorists/${detectorist_id}`}>
          <Avatar src={detectorist_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          {showEditForm ? (
            <CommentEditForm
              id={id}
              detectorist_id={detectorist_id}
              content={content}
              detectoristImage={detectorist_image}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>{content}</p>
          )}
        </Media.Body>
        {is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </>
  );
};

export default Comment;
