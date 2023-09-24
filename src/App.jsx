import { useEffect, useState } from "react";
import "./App.css";

const KEY = "4fefc778";

function App() {
  const [query, setQuery] = useState("");
  const [movieList, setMovieList] = useState([]);

  useEffect(
    function () {
      async function fetchMovieList() {
        try {
          const response = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );
          if (!response.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await response.json();
          if (data.Response === "False") throw new Error("Movie not found");

          console.log(data);
          setMovieList(data.Search);
        } catch (error) {
          console.error(error.message);
        }
      }
      fetchMovieList();
    },
    [query]
  );

  return (
    <div>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
      </NavBar>
      <MovieList movieList={movieList} />
    </div>
  );
}

function NavBar({ children }) {
  return (
    <nav
      style={{
        padding: "30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "100px",
        backgroundColor: "peachpuff",
        color: "green",
      }}
    >
      {children}
    </nav>
  );
}

function Logo() {
  return <h1>Netflix</h1>;
}

function Search({ query, setQuery }) {
  return (
    <input
      type="text"
      placeholder="Search Movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function MovieList({ movieList }) {
  return (
    <ul style={{ backgroundColor: "lightblue" }}>
      {movieList.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function Movie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <h3>{movie.Year}</h3>
    </li>
  );
}

export default App;
