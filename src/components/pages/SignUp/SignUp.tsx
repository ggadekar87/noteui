import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import { generateOTP, saveSignUp, validOTP } from "../../store/actions/actions";
import { IOTPRequest, IUser } from "../../BAL/Type";
const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOTPGenerated, setIsOTPGenerated] = useState(false);
  const [otp, setOtp] = useState(Number);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const userId: string = useSelector((state: any) => state.home.userId);
  const isOtpGenerated: boolean = useSelector(
    (state: any) => state.home.isOtpGenerated
  );
  const isValidOTP: boolean = useSelector(
    (state: any) => state.home.isValidOTP
  );
  const handleSignUp = () => {
    const oPRequest: IOTPRequest = {
      username: username,
      password: password,
      otp: 0,
    };
    dispatch(generateOTP(oPRequest));
    setIsOTPGenerated(true);
  };
  useEffect(() => {
    if (isValidOTP) {
      const user: IUser = {
        _id: "",
        image: "",
        name: "",
        Mobile: "",
        profession: "",
        userId: username,
        email: username,
        password: password,
        active: true,
      };
      dispatch(saveSignUp(user));
      navigate("/");
    }
  }, []);
  const handelValidateOTP = () => {
    const oPRequest: IOTPRequest = {
      username: username,
      password: password,
      otp: otp,
    };
    dispatch(validOTP(oPRequest));
  };
  return (
    <div className="signupPage">
      <h2>New User</h2>
      <form>
        {!isOTPGenerated ? (
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
                    autoComplete="on"
                  />
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <label>
                  Confirm Password:<br></br>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="on"
                  />
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <button onClick={handleSignUp}>Sign up</button>
              </td>
            </tr>
          </table>
        ) : (
          <>
            <table>
              <tr>
                <td>
                  <label>
                    OTP:<br></br>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(parseInt(e.target.value))}
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <button onClick={handelValidateOTP}>Validate OTP</button>
                </td>
              </tr>
            </table>
          </>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default SignUp;
