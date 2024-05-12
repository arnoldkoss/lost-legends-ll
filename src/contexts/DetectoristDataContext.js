import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { followHelper } from "../utils/utils";


export const DetectoristDataContext = createContext();
export const SetDetectoristDataContext = createContext();

export const useDetectoristData = () => useContext(DetectoristDataContext);
export const useSetDetectoristData = () => useContext(SetDetectoristDataContext);

export const DetectoristDataProvider = ({ children }) => {
    const [detectoristData, setDetectoristData] = useState({
        // we will use the pageProfile later!
        pageDetectorist: { results: [] },
        popularDetectorists: { results: [] },
      });

    
    const currentUser = useCurrentUser();

    const handleFollow = async (clickedDetectorist) => {
      try {
        const { data } = await axiosRes.post("/followers/", {
          followed: clickedDetectorist.id,
        });
  
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
        <DetectoristDataContext.Provider value={detectoristData}>
            <SetDetectoristDataContext.Provider value={{ setDetectoristData, handleFollow }}>
                {children}
            </SetDetectoristDataContext.Provider>
        </DetectoristDataContext.Provider>
      );
};

