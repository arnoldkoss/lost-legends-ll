import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";

// Custom hook for redirecting users based on their authentication status
export const useRedirect = (userAuthStatus) => {
  const history = useHistory();

  // Effect to handle redirect based on user authentication status
  useEffect(() => {
    const handleMount = async () => {
      try {
        await axios.post("/dj-rest-auth/token/refresh/");
        // if user is logged in, the code below will run
        if (userAuthStatus === "loggedIn") {
          history.push("/");
        }
      } catch (err) {
        // if user is not logged in, the code below will run
        if (userAuthStatus === "loggedOut") {
          history.push("/");
        }
      }
    };

    handleMount();
  }, [history, userAuthStatus]);
};
