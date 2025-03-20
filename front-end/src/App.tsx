import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./client/layout/MainLayout";
import SlideBanner from "./client/banner/SlideBanner";
import CategoryGrid from "./client/main/CategoryGrid";
import MotorByCategoryPage from "@/client/products/MotorByCategoryPage";
import DetailMotor from "@/client/products/DetailMotor";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
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
            <Route path="product/1" element={<DetailMotor />} />
          </Route>
        </Routes>

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
