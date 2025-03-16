import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./client/layout/MainLayout";
import SlideBanner from "./client/banner/SlideBanner";
import CategoryGrid from "./client/main/CategoryGrid";
import MotorByCategoryPage from "@/client/products/MotorByCategoryPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={
              <>
                <SlideBanner />
                <CategoryGrid />
              </>
            }
          />
          <Route path="products" element={<MotorByCategoryPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
