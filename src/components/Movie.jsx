import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const Movie = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setmovie] = useState({});
  const [error, seterror] = useState(false);

  useEffect(() => {
    const searchMovie = async () => {
      try {
        const { data } = await axios.get(
          `http://www.omdbapi.com/?apikey=5b6db523&i=${id}`
        );
        if (data.Error) {
          seterror(true);
          //console.log(first)
          return;
        }
        setmovie(data);
      } catch {
        console.log("error search movie", error.message);
      }
    };
    searchMovie();
  }, [id]);

  return (
    <div>
      <div className="card mt-4 bg-dark ">
        {!error && (
          <div className="row">
            <div className="col-3">
              {movie.Poster === "N/A" ? (
                <img
                  src="/assets/film-image.png"
                  alt="poster film"
                  className="w-100"
                />
              ) : (
                <img className="rounded w-100" src={movie.Poster} alt="img" />
              )}
            </div>
            <div className="col-8">
              <div className="card-body bg-dark">
                <div className="card-title">
                  <h1 className="text-light">
                    {movie.Title} <strong>{movie.Year}</strong>
                  </h1>
                  <p className="text-light text-start">{movie.Plot}</p>
                  <p className="text-light text-start">IMDB Rating : <strong> {movie.imdbRating}/10</strong></p>
                  <p className="text-light text-start"><strong> {movie.Genre}</strong></p>
                  <Link to="/">
                    <button className="btn btn-primary">Go back</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
