import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Movies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [inputSearch, setinputSearch] = useState("");

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async (q) => {
    try {
      const { data } = await axios.get(
        `http://www.omdbapi.com/?apikey=5b6db523&s=${q}`
      );
      setMovies(data.Search);
    } catch (error) {
      console.log("error en getmovies", error.message);
    }
  };

  const search = (e) => {
    setinputSearch(e.target.value);
    getMovies(e.target.value);
    navigate(`?q=${e.target.value}`);
  };

  return (
    <div className="bg-dark">
      <section className="col-xxl-8 form-group mx-auto w-50">
        <h1 className="text-center text-light"> Film finder</h1>
        <input
          type="text"
          placeholder="Search"
          className="form-control"
          onChange={(e) => search(e)}
        ></input>
      </section>

      <section className="row col-xxl-13 ">
        {movies ? movies.map((movie) => (
          <Link
            to={`/description/${movie.imdbID}`}
            key={movie.imdbID}
            className="col-md-4 my-3 text-decoration-none "
          >
            <div className="card bg-dark">
              <div className="card-light ">
                {movie.Poster === "N/A" ? (
                  <img
                    src="/assets/film-image.png"
                    alt="poster film"
                    className="w-75 rounded"
                  />
                ) : (
                  <img src={movie.Poster} alt="img" />
                )}
              </div>
              <div className="card-body">
                  <h4>{movie.Title}</h4>
              </div>
            </div>
          </Link>
        )) : <div className="text-center text-light mt-5">
        <h1>No results found {inputSearch}</h1>
      </div>
      } 
      </section>
    </div>
  );
};
