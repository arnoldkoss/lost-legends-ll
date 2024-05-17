import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { followHelper, unfollowHelper } from "../utils/utils";

// Creating context for detectorist data and function to set detectorist data
export const DetectoristDataContext = createContext();
export const SetDetectoristDataContext = createContext();

// Custom hooks for accessing detectorist data and function to set detectorist data
export const useDetectoristData = () => useContext(DetectoristDataContext);
export const useSetDetectoristData = () =>
  useContext(SetDetectoristDataContext);

// Component for providing and managing detectorist data within the application
export const DetectoristDataProvider = ({ children }) => {
  const [detectoristData, setDetectoristData] = useState({
    // we will use the pageProfile later!
    pageDetectorist: { results: [] },
    popularDetectorists: { results: [] },
  });

  const currentUser = useCurrentUser();

  // Function to handle following a detectorist
  const handleFollow = async (clickedDetectorist) => {
    try {
      const { data } = await axiosRes.post("/followers/", {
        followed: clickedDetectorist.id,
      });

      // Updating detectorist data state after following a detectorist
      setDetectoristData((prevState) => ({
        ...prevState,
        pageDetectorist: {
          results: prevState.pageDetectorist.results.map((detectorist) =>
            followHelper(detectorist, clickedDetectorist, data.id)
          ),
        },
        popularDetectorists: {
          ...prevState.popularDetectorists,
          results: prevState.popularDetectorists.results.map((detectorist) =>
            followHelper(detectorist, clickedDetectorist, data.id)
          ),
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  // Function to handle unfollowing a detectorist
  const handleUnfollow = async (clickedDetectorist) => {
    try {
      await axiosRes.delete(`/followers/${clickedDetectorist.following_id}/`);

      // Updating detectorist data state after unfollowing a detectorist
      setDetectoristData((prevState) => ({
        ...prevState,
        pageDetectorist: {
          results: prevState.pageDetectorist.results.map((detectorist) =>
            unfollowHelper(detectorist, clickedDetectorist)
          ),
        },
        popularDetectorists: {
          ...prevState.popularDetectorists,
          results: prevState.popularDetectorists.results.map((detectorist) =>
            unfollowHelper(detectorist, clickedDetectorist)
          ),
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect hook to fetch popular detectorists data on component mount and when current user changes
  useEffect(() => {
    // Function to fetch popular detectorists data from the backend and update state
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

  // Providing detectorist data and function to set detectorist data to children components through context
  return (
    <DetectoristDataContext.Provider value={detectoristData}>
      <SetDetectoristDataContext.Provider
        value={{ setDetectoristData, handleFollow, handleUnfollow }}
      >
        {children}
      </SetDetectoristDataContext.Provider>
    </DetectoristDataContext.Provider>
  );
};
