import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import PostEditForm from "./pages/posts/PostEditForm";
import DetectoristPage from "./pages/detectorists/DetectoristPage";
import UsernameForm from "./pages/detectorists/UsernameForm";
import UserPasswordForm from "./pages/detectorists/UserPasswordForm";
import DetectoristEditForm from "./pages/detectorists/DetectoristEditForm";

function App() {
  const currentUser = useCurrentUser();
  const detectorist_id = currentUser?.detectorist_id || "";
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <PostsPage message="No results found. Adjust the search keyword." />
            )}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              <PostsPage
                message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__detectorist=${detectorist_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/wishlist"
            render={() => (
              <PostsPage
                message="No results found. Adjust the search keyword or add a post to your Wishlist."
                filter={`wishlist__owner__detectorist=${detectorist_id}&ordering=-wishlist__created_at&`}
              />
            )}
          />

          <Route
            exact
            path="/favorite"
            render={() => (
              <PostsPage
                message="No results found. Adjust the search keyword or add a post to your favorites."
                filter={`favorites__owner__detectorist=${detectorist_id}&ordering=-favorite__created_at&`}
              />
            )}
          />

          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
          <Route
            exact
            path="/detectorists/:id"
            render={() => <DetectoristPage />}
          />
          <Route
            exact
            path="/detectorists/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/detectorists/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route
            exact
            path="/detectorists/:id/edit"
            render={() => <DetectoristEditForm />}
          />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
