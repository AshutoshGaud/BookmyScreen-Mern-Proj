import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Profile from "./pages/profile";
import SeatLayout from "./pages/SeatLayout";
import Checkout from "./pages/Checkout";

function App() {

  const location = useLocation();

  // 🔥 Hide header/footer on these pages
  const hideLayout =
    location.pathname.includes("seat-layout") ||
    location.pathname.includes("checkout");

  return (
    <div className="flex flex-col min-h-screen">

      {!hideLayout && <Header />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />

          {/* Movie Details */}
          <Route
            path="/movies/:state/:movieName/:movieId/ticket"
            element={<MovieDetails />}
          />

          <Route path="/profile" element={<Profile />} />

          {/* Seat Layout */}
          <Route
            path="/movies/:movieId/:movieName/:state/theater/:theaterId/show/:showId/seat-layout"
            element={<SeatLayout />}
          />

          {/* Checkout */}
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;