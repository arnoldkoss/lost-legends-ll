import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";


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
            <SetDetectoristDataContext.Provider value={setDetectoristData}>
                {children}
            </SetDetectoristDataContext.Provider>
        </DetectoristDataContext.Provider>
      );
};

