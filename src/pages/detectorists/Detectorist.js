import React from 'react'
import styles from "../../styles/Detectorist.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import Button from "react-bootstrap/Button";
import { useSetDetectoristData } from '../../contexts/DetectoristDataContext';

const Detectorist = (props) => {
    const {detectorist, mobile, imageSize=55} = props;
    const { id, following_id, image, owner } = detectorist;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const { handleFollow, handleUnfollow } = useSetDetectoristData();

  return (
    <div className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
        <div>
        <Link className="align-self-center" to={`/detectorists/${id}`}>
          <Avatar src={image} height={imageSize} />
        </Link>
      </div>
      <div className={`mx-2 ${styles.WordBreak}`}>
        <strong>{owner}</strong>
      </div>
      <div className={`text-right ${!mobile && "ml-auto"}`}>
      {!mobile &&
          currentUser &&
          !is_owner &&
          (following_id ? (
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

      </div>

    </div>
  )
}

export default Detectorist