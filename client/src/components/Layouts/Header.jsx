import { NavLink, Link } from "react-router-dom";
import "./Header.css";
import useAuth from "../../context/useAuth";
import SearchForm from "../Forms/SearchForm";
import useCategory from "../../hooks/useCategory";
import useCart from "../../context/useCart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart] = useCart();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };
  return (
    <>
      <nav
        style={{ minHeight: "10vh" }}
        className="navbar navbar-expand-lg bg-body-tertiary"
      >
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            FootyShop
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav  ms-auto mb-2 mb-lg-0">
              <SearchForm />
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle text-decoration-none"
                    role="button"
                    id="dropdownMenuButton1"
                    to={"/"}
                    data-bs-toggle="dropdown"
                  >
                    Categories
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        className="dropdown-item nav-link"
                        to={"/categories"}
                      >
                        All Categories
                      </Link>
                    </li>
                    {categories.map((c) => (
                      <li key={c._id}>
                        <Link
                          className="dropdown-item nav-link"
                          to={`/category/${c.slug}`}
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </>
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle text-decoration-none"
                      role="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>

                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item nav-link"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item nav-link"
                        >
                          LogOut
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item d-flex align-items-center">
                <Badge count={cart.length}>
                  <NavLink to="/cart" className="nav-link">
                    Cart
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
