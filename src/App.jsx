import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Movie } from "./components/Movie";
import { Movies } from "./components/Movies";
import { Page404 } from "./components/Page404";

export const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path ="/" element={<Movies/>}/>
          <Route path="/description/:id" element={<Movie />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </Router>
  );
};
