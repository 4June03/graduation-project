import { Route, Routes } from "react-router-dom";
import "./App.css";
import SliderBanner from "./client/banner/SliderBanner";
import ShowingFilm from "./client/MoviesList/ShowingFilm";
import UpComingFilm from "./client/MoviesList/UpComingFilm";
import MainLayout from "./client/layout/MainLayout";
import DetailMovie from "./client/Movie/DetailMovie";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={
              <>
                <SliderBanner />
                <ShowingFilm />
                <UpComingFilm />
              </>
            }
          />

          <Route path="movie" element={<DetailMovie />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
