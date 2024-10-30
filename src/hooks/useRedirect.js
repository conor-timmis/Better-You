import axios from "axios";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

export const useRedirect = (userAuthStatus) => {
  const history = useHistory();
  const location = useLocation();

  /*
    Checks if the user is currently logged in or not
    If logged in, refresh token
    Sends user to home page if logged in and out
    "/" page has different view for loggedIn
    and loggedOut
  */
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
          if (location.pathname !== '/contact/create') {
            history.push("/");
          }
        }
      }
    };

    handleMount();
  }, [history, userAuthStatus, location]);
};
