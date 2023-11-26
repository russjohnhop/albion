import { useState, useEffect } from "react";
import React from "react";
import ReactDom from "react-dom";
import "../App.css";
import ViewAlbums from "./ViewAlbums";

export default function Search(accessToken) {
  const [searchInput, setSearchInput] = useState("");
  const [albums, setAlbums] = useState([]);
  const [artistExists, setArtistExists] = useState(false);
  const [artist, setArtist] = useState("");
  const [isCentered, setIsCentered] = useState(true);

  function handleChange(event) {
    setSearchInput(event.target.value);
  }

  const toggleAlignment = () => {
    setIsCentered(!isCentered);
  };

  const searchSpotify = async () => {
    const url = "https://api.spotify.com/v1/search";
    const searchQuery = encodeURIComponent(searchstring);
    const typeQuery = "type=artist";
  };

  async function handleSearch(event) {
    event.preventDefault();

    console.log("artist name:", searchInput);

    // Get request using search for artist ID
    let searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken.accessToken,
      },
    };

    console.log("search Parameters:", searchParameters);
    let artistId;
    let artist;
    try {
      const response = await fetch(
        "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
        searchParameters
      );

      if (!response.ok) {
        console.error("API request failed with status:", response.status);
        console.error("Response body:", await response.text());
        return;
      }

      const data = await response.json();
      artistId = data.artists.items[0].id;
      setArtist(data.artists.items[0].name);
      setArtistExists(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    // Grab all albums by that artist

    let albums = await fetch(
      "https://api.spotify.com/v1/artists/" +
        artistId +
        "/albums/" +
        "?include_groups=album&market=US&limit=50",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Albums:", data);
        setAlbums(data.items);
      });
  }
  return (
    <>
      <div
        className={`search--block ${isCentered ? "search--centerBlock" : ""}`}
      >
        <div className="search--header">
          <h1>Albion</h1>
        </div>
        <form className="search--form">
          <input
            placeholder="Search For Artist"
            type="search"
            onChange={handleChange}
            className="search--inputField"
          />
          <button
            type="button"
            className="search--submitBtn"
            onClick={() => {
              handleSearch(event);
              toggleAlignment();
            }}
          >
            Search
          </button>
        </form>
      </div>
      <ViewAlbums albums={albums} artist={artistExists ? artist : undefined} />
    </>
  );
}

// Data pulling in
//
