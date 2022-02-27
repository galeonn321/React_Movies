import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export const Movie = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setmovie] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const searchMovie = async () => {
      try {
        const { data } = await axios.get(
          `http://www.omdbapi.com/?apikey=5b6db523&i=${id}`
        );
        if (data.Error) {
          setError(true);
          //message
          Swal.fire({
            icon: "error",
            title: "Film not found",         
          });
          return;
        }
        setmovie(data);
      } catch (error) {
        console.log("error search movie", Error.message);
      }
    };
    searchMovie();
  }, [id]);

  return (
    <div>
      <div className="card mt-4 bg-dark ">
        {!error ? (
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
                  <p className="text-light text-start">
                    IMDB Rating : <strong> {movie.imdbRating}/10</strong>
                  </p>
                  <p className="text-light text-start">
                    CAST : <strong> {movie.Actors}</strong>
                  </p>
                  <p className="text-light text-start">
                    Genre : <strong> {movie.Genre}</strong>
                  </p>
                  <p className="text-light text-start">
                    <strong> {movie.Runtime}</strong>
                  </p>
                  <button
                    className="btn btn-lg btn-primary mt-5"
                    onClick={() => navigate("/")}
                  >
                    Go back
                  </button>
                </div>
              </div>
            </div>
          </div>
        ):
        <div className="text-center">
          <h1>Error, film not found</h1>
          <Link to="/" className="btn btn-primary">Go back</Link>
        </div>
        }
      </div>
    </div>
  );
};
