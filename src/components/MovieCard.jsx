import React from "react";

function MovieCard(props) {
  let isFavorite = false;
  for (let i = 0; i < props.favorites.length; i++) {
    if (props.favorites[i].imdbID === props.movie.imdbID) {
      isFavorite = true;
      break;
    }
  }


  let buttonClass = "fav-btn";
  if (isFavorite === true) {
    buttonClass = "fav-btn disabled";
  }

  function handleButtonClick() {
    props.addFavorite(props.movie);
  }

  return (
    <div className="movie-card">
      <img src={props.movie.Poster} alt={props.movie.Title} />

      <div className="movie-info">
        <h3>{props.movie.Title}</h3>
        <p>Year: {props.movie.Year}</p>

        <button
          className={buttonClass}
          onClick={handleButtonClick}
          disabled={isFavorite}
        >
          + Favorite
        </button>
      </div>
    </div>
  );
}

export default MovieCard;