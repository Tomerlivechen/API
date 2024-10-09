import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";
import About from "./About";
import TestSpace from "./TestSpace";
import UsersPage from "./UsersPage";
import Feed from "./Feed";
import Profile from "./Profile";
import NavBar from "../Bars/NavBar";
import Register from "./Register";
import { ThemeProvider } from "../ContextAPI/ThemeContext";
import { LoggedInProvider } from "../ContextAPI/LoggedInContext";
import { UserProvider } from "../ContextAPI/UserContext";
import LoginPage from "./Login";
import ProtectedRoute from "../Constants/RoutrProtection/ProtectedRoute";
import NoAuthRoute from "../Constants/RoutrProtection/NoAuthRoute";
import { SearchProvider } from "../ContextAPI/SearchContext";
import { SearchPage } from "./SearchPage";
import { PostsProvider } from "../ContextAPI/PostsContexrt";

function RouterControler() {
  return (
    <>
      <ThemeProvider>
        <LoggedInProvider>
          <UserProvider>
            <SearchProvider>
              <PostsProvider>
                <Router>
                  <NavBar />
                  <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="About" element={<About />} />
                    <Route path="Test" element={<TestSpace />} />
                    <Route
                      path="Feed"
                      element={
                        <ProtectedRoute>
                          <Feed />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="UsersPage"
                      element={
                        <ProtectedRoute>
                          <UsersPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="search"
                      element={
                        <ProtectedRoute>
                          <SearchPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="Profile"
                      element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="Register"
                      element={
                        <NoAuthRoute>
                          <Register />
                        </NoAuthRoute>
                      }
                    />
                    <Route
                      path="Login"
                      element={
                        <NoAuthRoute>
                          <LoginPage />
                        </NoAuthRoute>
                      }
                    />
                  </Routes>
                </Router>
              </PostsProvider>
            </SearchProvider>
          </UserProvider>
        </LoggedInProvider>
      </ThemeProvider>
    </>
  );
}

export default RouterControler;
