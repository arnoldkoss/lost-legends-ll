import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import NavBar from "../NavBar";

// Test to check if NavBar renders properly
test("renders NavBar", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  // screen.debug();
  const signInLink = screen.getByRole("link", { name: "Sign in" });
  expect(signInLink).toBeInTheDocument();
});

// Test to check if link to user detectorist is rendered for a logged in user
test("renders link to the user detectorist for a logged in user", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const detectoristAvatar = await screen.findByText("Detectorist");
  expect(detectoristAvatar).toBeInTheDocument();
});

// Test to check if "Sign in" and "Sign up" buttons reappear after log out
test("renders Sign in and Sign up buttons again on log out", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  // Find and click the "Log Out" link
  const signOutLink = await screen.findByRole("link", { name: "Log Out" });
  fireEvent.click(signOutLink);

  // After log out, check if "Sign in" and "Sign up" links reappear
  const signInLink = await screen.findByRole("link", { name: "Sign in" });
  const signUpLink = await screen.findByRole("link", { name: "Sign up" });

  // Assertions to ensure the links are rendered again after log out
  expect(signInLink).toBeInTheDocument();
  expect(signUpLink).toBeInTheDocument();
});
