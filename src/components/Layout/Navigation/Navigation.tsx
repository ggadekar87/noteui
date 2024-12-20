import { Outlet, Link } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/reducer/authReducers";
import { useNavigate } from "react-router-dom";
import * as Constant from "../../BAL/Constants";
const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated: boolean = useSelector(
    (state: any) => state.home.isAuthenticated
  );
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("Email");
    localStorage.removeItem("userId");
    localStorage.removeItem("accountId");
    dispatch(logout(""));
    navigate("/indexpage");
    navigate(0);
  };
  return (
    <>
      <header>
        {!isAuthenticated ? (
          <nav>
            <ul className="navMenu">
              <li>
                <Link to="/indexpage">{Constant.NAVIGATION_MENU.Home}</Link>
              </li>
              <li>
                <Link to="/contact">{Constant.NAVIGATION_MENU.Contact}</Link>
              </li>
              <li>
                <Link to="/about">{Constant.NAVIGATION_MENU.AboutUs}</Link>
              </li>
              <li>
                <Link to="/signup">{Constant.NAVIGATION_MENU.SignUp}</Link>
              </li>
              <li>
                <Link to="/login">{Constant.NAVIGATION_MENU.Login}</Link>
              </li>
            </ul>
          </nav>
        ) : (
          <nav>
            <ul className="navMenu">
              <li>
                <Link to="/">{Constant.NAVIGATION_MENU.Home}</Link>
              </li>
              <li>
                <Link to="/contact">{Constant.NAVIGATION_MENU.Contact}</Link>
              </li>
              <li>
                <Link to="/about">{Constant.NAVIGATION_MENU.AboutUs}</Link>
              </li>
              <li>
                <Link to="/account">{Constant.NAVIGATION_MENU.MyAccount}</Link>
              </li>
              <li>
                <Link to="#" onClick={handleLogout}>
                  {Constant.NAVIGATION_MENU.Logout}
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </header>
      <Outlet />
    </>
  );
};

export default Navigation;
