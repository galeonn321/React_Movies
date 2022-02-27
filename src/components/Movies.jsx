import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Loading } from "./Loading";

export const Movies = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [inputSearch, setinputSearch] = useState("");
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const q = params.get("q") || "";
    setinputSearch(q);
    q === "" ? setMovies([]) : getMovies(q);
  }, [params]);

  const getMovies = async (q) => {
    try {
      setloading(true);
      const { data } = await axios.get(
        `http://www.omdbapi.com/?apikey=5b6db523&s=${q}`
      );
      setMovies(data.Search);
      setloading(false);
    } catch (error) {
      setloading(false);
      console.log("error en getmovies", error.message);
    }
  };

  const search = (e) => {
    if (e.target.value === "") {
      return clean();
    }
    setinputSearch(e.target.value);
    getMovies(e.target.value);
    navigate(`?q=${e.target.value}`);
  };

  const clean = () => {
    setMovies([]);
    setinputSearch("");
    navigate("");
  };

  return (
    <div className="bg-dark">
      <section className="col-xxl-8 form-group mx-auto w-50">
        <h1 className="text-center text-light"> Film finder</h1>
        <input
          type="text"
          placeholder="Search"
          className="form-control"
          value={inputSearch}
          onChange={(e) => search(e)}
        ></input>
      </section>

      {loading ? (
        <Loading />
      ) : (
        <section className="row col-xxl-13 ">
          {movies ? (
            movies.map((movie) => (
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
            ))
          ) : (
            <div className="text-center text-light mt-5">
              <h1>No results found {inputSearch}</h1>
            </div>
          )}
        </section>
      )}
    </div>
  );
};
