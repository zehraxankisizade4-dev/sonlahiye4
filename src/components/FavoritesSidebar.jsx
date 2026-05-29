import React, { useState } from "react";

function FavoritesSidebar(props) {
  const [name, setName] = useState("");

  let isEmpty = false;
  if (name.trim() === "") {
    isEmpty = true;
  }

  
  let hasLists = false;
  if (props.lists.length > 0) {
    hasLists = true;
  }


  let saveButtonClass = "btn btn-save";
  if (isEmpty === true) {
    saveButtonClass = "btn btn-save disabled";
  }

  let listButtonClass = "btn btn-list";
  if (hasLists === false) {
    listButtonClass = "btn btn-list disabled";
  }

  function handleInputChange(event) {
    setName(event.target.value);
  }

  function handleSaveClick() {
    props.saveList(name);
    setName(""); 
  }

  return (
    <div className="sidebar">
      <div className="sidebar-list">
        {props.favorites.map(function (movie) {
          return (
            <div key={movie.imdbID} className="fav-item">
              <span>{movie.Title}</span>
              <button
                className="remove-btn"
                onClick={function () {
                  props.removeFavorite(movie.imdbID);
                }}
              >
                ×
              </button>
            </div>
          );
        })}
      </div>

      <div className="sidebar-controls">
        <input
          value={name}
          onChange={handleInputChange}
          placeholder="Enter list name..."
        />

        <button
          className={saveButtonClass}
          disabled={isEmpty}
          onClick={handleSaveClick}
        >
          Add To Favorite List
        </button>

        <button
          className={listButtonClass}
          disabled={!hasLists}
          onClick={props.goToLists}
        >
          Look At Favorite List
        </button>
      </div>
    </div>
  );
}

export default FavoritesSidebar;