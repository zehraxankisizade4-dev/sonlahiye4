import React from "react";

function SavedLists(props) {
 
  function handleBackClick() {
    props.setShowLists(false);
  }

  
  let content;
  
  if (props.savedLists.length === 0) {
    content = <p className="no-lists-msg">No lists yet</p>;
  } else {
   
    content = props.savedLists.map(function (list) {
      return (
        <div key={list.id} className="saved-list-item">
          <h4>{list.name}</h4>
          <ul>
            {list.items.map(function (movie) {
              return (
                <li key={movie.imdbID}>
                  {movie.Title} ({movie.Year})
                </li>
              );
            })}
          </ul>
        </div>
      );
    });
  }

  return (
    <div className="saved-lists-container">
     
      <button className="back-btn" onClick={handleBackClick}>
        ← Back
      </button>

      <h3>Saved Lists</h3>

      {content}
    </div>
  );
}

export default SavedLists;