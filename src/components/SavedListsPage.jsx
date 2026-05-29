import React from "react";

function SavedListsPage(props) {
  return (
    <div className="list-page">
      <div className="list-container">
        {props.lists.map(function (list) {
          return (
            <div key={list.id} className="list-row-wrapper">
              <div className="list-box">
                <h2 className="list-title">{list.name}</h2>

                {list.items.map(function (movie) {
                  return (
                    <div key={movie.imdbID} className="list-row">
                      <span>{movie.Title}</span>
                      <a
                        className="imdb"
                        href={"https://www.imdb.com/title/" + movie.imdbID}
                        target="_blank"
                        rel="noreferrer"
                      >
                        IMDB
                      </a>
                    </div>
                  );
                })}
              </div>

              <button
                className="delete-btn"
                onClick={function () {
                  props.deleteList(list.id);
                }}
              >
                ×
              </button>
            </div>
          );
        })}

        <div className="footer">
         
          <button className="movies-btn" onClick={props.goBack}>
            Movies
          </button>
        </div>
      </div>
    </div>
  );
}

export default SavedListsPage;