import { createSlice } from "@reduxjs/toolkit";
import { loginUser, saveSignUp } from "../actions/actions";
const initialState: any = {
  isSuccess: false,
  error: "",
  user: null,
  token: "",
  userId: "",
  isAuthenticated: false,
  isOtpGenerated: false,
  isValidOTP: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isUserLoggedIn: (state, action) => {
      const token = state.token; //localStorage.getItem("token");
      const userId = state.userId; //localStorage.getItem("userId");
      state.token = token ? token : "";
      state.userId = userId ? userId : "";
      state.isAuthenticated = token != null ? true : false;
    },
    logout: (state, action) => {
      state.token = "";
      state.userId = "";
      state.isAuthenticated = false;
      // localStorage.removeItem("token");
      // localStorage.removeItem("expirationDate");
      // localStorage.removeItem("userId");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = "";
        state.isAuthenticated = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        debugger;
        if (action.payload.Success) {
          state.error = "";
          state.user = action.payload.Data.User;
          state.userId = action.payload.Data.User._id;
          state.token = action.payload.Data.token;
          state.isAuthenticated = action.payload.isAuthenticated;
          // localStorage.setItem("token", action.payload.Data.token);
          // localStorage.setItem("expirationDate", "");
          // localStorage.setItem("userId", action.payload.Data.User.email);
          localStorage.setItem("accountId", action.payload.Data.User._id);
          localStorage.setItem("Email", action.payload.Data.User.email);
        } else {
          state.error = "Invalid login";
          state.isAuthenticated = false;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = "";
        state.isAuthenticated = false;
      })

      .addCase(saveSignUp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userId = action.payload.insertedId;
        state.token = action.payload.token;
        state.isAuthenticated = action.payload.isAuthenticated;
      })
      .addCase(saveSignUp.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});
export const { isUserLoggedIn, logout } = authSlice.actions;

export default authSlice.reducer;
