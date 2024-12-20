import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { ILoginRequest } from "../../BAL/Type";
import { loginUser } from "../../store/actions/actions";
import { IsValid } from "../../BAL/CommonFunction";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const error: string = useSelector((state: any) => state.home.error);
  const isAuthenticated: boolean = useSelector(
    (state: any) => state.home.isAuthenticated
  );
  const handleLogin = async () => {
    const loginRequest: ILoginRequest = {
      username: username,
      password: password,
    };
    dispatch(loginUser(loginRequest));
  };
  useEffect(() => {
    if (!IsValid(error) && isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, error]);
  return (
    <div className="loginPage">
      <h2>Login</h2>
      {!isAuthenticated ? "" : "Invalid loginss"}
      <form onSubmit={() => handleLogin()}>
        <table>
          <tr>
            <td>
              <label>
                Username:<br></br>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                Password:<br></br>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </td>
          </tr>
          <tr>
            <td>
              <button type="submit">Login</button>
            </td>
          </tr>
        </table>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
