import jwtDecode from "jwt-decode";
// import { jwtDecode } from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

// Helper function to fetch more data from a paginated API endpoint
export const fetchMoreData = async (resource, setResource) => {
  try {
    // Fetch data from the next page of the resource
    const { data } = await axiosReq.get(resource.next);
    // Update the resource with the new data
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      // Merge the new results with the existing ones, avoiding duplicates
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {}
};

// Helper function to update user data when following another user
export const followHelper = (detectorist, clickedDetectorist, following_id) => {
  return detectorist.id === clickedDetectorist.id
    ? // This is the profile I clicked on,
      // update its followers count and set its following id
      {
        ...detectorist,
        followers_count: detectorist.followers_count + 1,
        following_id,
      }
    : detectorist.is_owner
    ? // This is the profile of the logged in user
      // update its following count
      { ...detectorist, following_count: detectorist.following_count + 1 }
    : // this is not the profile the user clicked on or the profile
      // the user owns, so just return it unchanged
      detectorist;
};

export const unfollowHelper = (detectorist, clickedDetectorist) => {
  return detectorist.id === clickedDetectorist.id
    ? // This is the profile I clicked on,
      // update its followers count and set its following id
      {
        ...detectorist,
        followers_count: detectorist.followers_count - 1,
        following_id: null,
      }
    : detectorist.is_owner
    ? // This is the profile of the logged in user
      // update its following count
      { ...detectorist, following_count: detectorist.following_count - 1 }
    : // this is not the profile the user clicked on or the profile
      // the user owns, so just return it unchanged
      detectorist;
};

export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};
