import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Productdetails from "./components/Productdetails";
import TotalStockCategory from "./components/TotalStockCategory";
import ProductsAddedByDuration from "./components/ProductsAddedByDuration";

function Navbar() {
  const location = useLocation();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4 rounded">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Product Management Dashboard
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className={`nav-link${
                  location.pathname === "/list-product" ||
                  location.pathname === "/"
                    ? " active"
                    : ""
                }`}
                to="/list-product"
              >
                List product
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link${
                  location.pathname === "/total-stock-category" ? " active" : ""
                }`}
                to="/total-stock-category"
              >
                Total stock category
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link${
                  location.pathname === "/products-added-by-duration"
                    ? " active"
                    : ""
                }`}
                to="/products-added-by-duration"
              >
                Products added by duration
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/list-product" element={<Productdetails />} />
          <Route
            path="/total-stock-category"
            element={<TotalStockCategory />}
          />
          <Route
            path="/products-added-by-duration"
            element={<ProductsAddedByDuration />}
          />
          <Route path="/" element={<Productdetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
