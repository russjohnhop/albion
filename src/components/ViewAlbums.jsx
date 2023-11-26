import { useState, useEffect } from "react";
import React from "react";
import ReactDom from "react-dom";
import "../App.css";

export default function ViewAlbums({ albums, artist }) {
  if (albums && albums.length > 0) {
    return (
      <div className="album--background">
        <h2 className="album--h2">{artist}'s albums</h2>
        <div className="album--grid">
          {albums.length > 0 &&
            albums.map((album, i) => (
              <div key={i} className="album--card">
                <h3 className="album--title">{album.name}</h3>
                <img
                  src={album.images[0].url}
                  className="album--image"
                  alt={album.name}
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  // return (
  //   <div className="album--background">
  //     <div className="album--grid">
  //       {albums.length > 0 &&
  //         albums.map((album, i) => (
  //           <div key={i} className="album--card">
  //             <h3 className="album--title">{album.name}</h3>
  //             <img
  //               src={album.images[0].url}
  //               className="album--image"
  //               alt={album.name}
  //             />
  //           </div>
  //         ))}
  //     </div>
  //   </div>
  // );
}

// CSS
// Learning whether to use flexbox or grid

// Think I need to use grid
// Currently it's gridding the three columns instead of gridding separate albums fix
