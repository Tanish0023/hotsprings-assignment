import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import SearchPage from "./pages/SearchPage";
import FavoritesPage from "./pages/FavoritesPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SearchPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
