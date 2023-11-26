import { useState, useEffect } from "react";
import React from "react";
import ReactDom from "react-dom";
import "./App.css";
import Search from "./components/Search";

const clientID = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

// App handles authorisation, passing the access token to Search.jsx
// Also refreshes token before expiring

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [expiresAt, setExpiresAt] = useState(0); // Store token expiration time in seconds

  useEffect(() => {
    const getToken = async () => {
      const authParameters = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body:
          "grant_type=client_credentials&client_id=" +
          clientID +
          "&client_secret=" +
          clientSecret,
      };

      const response = await fetch(
        "https://accounts.spotify.com/api/token",
        authParameters
      );

      if (!response.ok) {
        console.error("Failed to fetch token");
        return;
      }

      const data = await response.json();
      setAccessToken(data.access_token);

      // Calculate token expiration time (e.g., 3600 seconds from now)
      const expiresIn = data.expires_in || 3600; // Default to 3600 seconds if no expiresIn provided
      const expirationTime = Date.now() + expiresIn * 1000;
      setExpiresAt(expirationTime);

      // Schedule token refresh slightly before it expires
      const refreshTime = expirationTime - 50 * 1000; // Refresh 50 seconds before expiration
      setTimeout(refreshToken, refreshTime - Date.now());
    };

    getToken();
  }, []);

  // Token refresh function
  const refreshToken = async () => {
    // Make a request to Spotify's token endpoint with the refresh token
    // Update the access token and its expiration time in your state
    // You can follow the same logic you used in the initial token request

    // After refreshing, schedule the next refresh
    const refreshTime = expiresAt - 50 * 1000; // Refresh 50 seconds before expiration
    setTimeout(refreshToken, refreshTime - Date.now());
  };

  // Add logic to check for and refresh access token if expired

  return (
    <>
      <Search accessToken={accessToken} />
      {/* <Recommend /> */}
    </>
  );
}

export default App;
