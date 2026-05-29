import React, { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import FavoritesSidebar from "./components/FavoritesSidebar";
import SavedListsPage from "./components/SavedListsPage";
import "./App.css";

function App() {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;

  const [page, setPage] = useState("home");
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [lists, setLists] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(function () {
    fetchMovies("batman");
  }, []);

  async function fetchMovies(title) {
    const res = await fetch(
      "https://www.omdbapi.com/?s=" + title + "&apikey=" + apiKey
    );
    const data = await res.json();
    setMovies(data.Search || []);
  }

  function searchMovies() {
    if (search.trim() === "") {
      return;
    }
    fetchMovies(search);
  }

  function addFavorite(movie) {
    let exists = false;
    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i].imdbID === movie.imdbID) {
        exists = true;
        break;
      }
    }
    if (exists === false) {
      setFavorites([...favorites, movie]);
    }
  }

  function removeFavorite(id) {
    const filtered = favorites.filter(function (m) {
      return m.imdbID !== id;
    });
    setFavorites(filtered);
  }

  function saveList(name) {
    if (favorites.length === 0 || name.trim() === "") {
      return;
    }

    const newList = {
      id: Date.now(),
      name: name,
      items: favorites,
    };

    setLists([...lists, newList]);
    setFavorites([]);
  }

  function deleteList(id) {
    const filteredLists = lists.filter(function (l) {
      return l.id !== id;
    });
    setLists(filteredLists);
  }

  function handleInputChange(event) {
    setSearch(event.target.value);
  }

  function handleGoToPage() {
    setPage("lists");
  }

  function handleGoBack() {
    setPage("home");
  }

  let mainContent;

  if (page === "home") {
    mainContent = (
      <>
        <div className="search-box">
          <input
            value={search}
            onChange={handleInputChange}
            placeholder="search movie"
          />
          <button onClick={searchMovies}>Search</button>
        </div>

        <div className="layout">
          <div className="movies">
            {movies.map(function (movie) {
              return (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  addFavorite={addFavorite}
                  favorites={favorites}
                />
              );
            })}
          </div>

          <FavoritesSidebar
            favorites={favorites}
            removeFavorite={removeFavorite}
            saveList={saveList}
            lists={lists}
            setFavorites={setFavorites}
            goToLists={handleGoToPage}
          />
        </div>
      </>
    );
  } else {
    mainContent = (
      <SavedListsPage
        lists={lists}
        goBack={handleGoBack}
        deleteList={deleteList}
      />
    );
  }

  return (
    <div className="container">
      <h1 className="header">Movie</h1>
      {mainContent}
    </div>
  );
}

export default App;