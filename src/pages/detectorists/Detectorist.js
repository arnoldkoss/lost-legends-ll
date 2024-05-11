import React from 'react'
import styles from "../../styles/Detectorist.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const Detectorist = (props) => {
    const {detectorist, mobile, imageSize=55} = props;
    const { id, following_id, image, owner } = detectorist;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

  return (
    <div>Detectorist</div>
  )
}

export default Detectorist