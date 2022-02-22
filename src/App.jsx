import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Movie } from "./components/Movie";
import { Movies } from "./components/Movies";

export const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path ="/" element={<Movies/>}/>
          <Route path="/description/:id" element={<Movie />} />
        </Routes>
      </div>
    </Router>
  );
};
