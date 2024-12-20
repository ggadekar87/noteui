import { createSlice } from "@reduxjs/toolkit";
import { IContent, IMainMenu, ISubMenu } from "../../BAL/Type";
import SubMenuForm from "../../pages/Account/SubMenuForm/SubMenuForm";
import Content from "../../content/content";
import {
  loginUser,
  saveSignUp,
  generateOTP,
  validOTP,
  getSubMenu,
  getMainMenu,
  getContent,
  getUserInfo,
  updateUserInfo,
  createMainMenu,
  deleteMainMenu,
  updateMainMenu,
  deleteSubMenu,
  createSubMainMenu,
  updateSubMainMenu,
  createContent,
  deleteContent,
  updateContent,
} from "../actions/actions";
const initialState: any = {
  status: "",
  isSuccess: false,
  error: "",
  user: null,
  token: "",
  userId: "",
  isAuthenticated: false,
  isOtpGenerated: false,
  isValidOTP: false,
  mainMenu: [],
  subMenu: [],
  filteredSubMenu: [],
  content: [],
  filteredContent: [],
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    isUserLoggedIn: (state, action) => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      state.token = token ? token : "";
      state.userId = userId ? userId : "";
      state.isAuthenticated = token != null ? true : false;
    },
    logout: (state, action) => {
      localStorage.removeItem("token");
      localStorage.removeItem("expirationDate");
      localStorage.removeItem("userId");
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
          localStorage.setItem("token", action.payload.Data.token);
          localStorage.setItem("expirationDate", "");
          localStorage.setItem("userId", action.payload.Data.User.email);
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
      })

      .addCase(generateOTP.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isOtpGenerated = action.payload.acknowledged;
      })
      .addCase(generateOTP.rejected, (state, action) => {
        state.status = "failed";
      })

      .addCase(validOTP.pending, (state) => {
        state.status = "loading";
      })
      .addCase(validOTP.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isOtpGenerated = false;
        state.isValidOTP =
          action.payload.Message.localeCompare("Valid Otp") === 0;
      })
      .addCase(validOTP.rejected, (state, action) => {
        state.status = "failed";
        state.isValidOTP = false;
      })

      .addCase(getSubMenu.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSubMenu.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload.length > 0) {
          //state.subMenu = action.payload;
          state.filteredSubMenu = action.payload;
          state.filteredContent = [];
        } else {
          state.filteredSubMenu = [];
        }
      })
      .addCase(getSubMenu.rejected, (state, action) => {
        state.status = "failed";
        state.isValidOTP = false;
      })

      .addCase(getMainMenu.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMainMenu.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload.Success) {
          state.mainMenu = action.payload.Data;
        } else {
          state.error = action.payload.Error;
        }
      })
      .addCase(getMainMenu.rejected, (state, action) => {
        state.status = "failed";
        state.isValidOTP = false;
      })

      .addCase(getContent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getContent.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload.Success) {
          state.content = action.payload.Data;
          state.filteredContent = action.payload.Data;
        } else {
          state.content = [];
          state.filteredContent = [];
        }
      })
      .addCase(getContent.rejected, (state, action) => {
        state.status = "failed";
        state.isValidOTP = false;
      })

      .addCase(getUserInfo.pending, (state, action) => {
        state.error = "";
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload.Success) {
          state.user = action.payload.Data;
        } else {
          state.error = action.payload.Error;
        }
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = "Unable to fetch user details";
        state.isValidOTP = false;
      })

      .addCase(updateUserInfo.pending, (state, action) => {
        state.error = "";
        state.isSuccess = false;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload?.Success) {
          state.isSuccess = true;
        } else {
          state.error = action.payload?.Error;
        }
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.status = "failed";
        state.isSuccess = false;
        state.error = "";
      })

      .addCase(createMainMenu.pending, (state, action) => {
        state.error = "";
        state.isSuccess = false;
      })
      .addCase(createMainMenu.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload?.Success) {
          state.isSuccess = true;
          const _menu = [...state.mainMenu];
          _menu.push(action.payload.Data);
          state.mainMenu = _menu;
        } else {
          state.error = action.payload?.Error;
        }
      })
      .addCase(createMainMenu.rejected, (state, action) => {
        state.status = "failed";
        state.isSuccess = false;
        state.error = "";
      })

      .addCase(deleteMainMenu.pending, (state, action) => {
        state.error = "";
        state.isSuccess = false;
      })
      .addCase(deleteMainMenu.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload?.Success) {
          state.isSuccess = true;
          let _menu = [...state.mainMenu];
          _menu = _menu.filter((x) => x._id !== action.payload.Data);
          state.mainMenu = _menu;
        } else {
          state.error = action.payload?.Error;
        }
      })
      .addCase(deleteMainMenu.rejected, (state, action) => {
        state.status = "failed";
        state.isSuccess = false;
        state.error = "";
      })

      .addCase(updateMainMenu.pending, (state, action) => {
        state.error = "";
        state.isSuccess = false;
      })
      .addCase(updateMainMenu.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload?.Success) {
          state.isSuccess = true;
          let _menu = [...state.mainMenu];
          var foundIndex = _menu.findIndex(
            (x) => x._id === action.payload.Data._id
          );
          let tempMenu: IMainMenu = {
            _id: action.payload.Data._id,
            userId: action.payload.Data.userId,
            name: action.payload.Data.name,
          };
          _menu[foundIndex] = tempMenu;
          state.mainMenu = _menu;
        } else {
          state.error = action.payload?.Error;
        }
      })
      .addCase(updateMainMenu.rejected, (state, action) => {
        state.status = "failed";
        state.isSuccess = false;
        state.error = "";
      })

      .addCase(deleteSubMenu.pending, (state, action) => {
        state.error = "";
        state.isSuccess = false;
      })
      .addCase(deleteSubMenu.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload?.Success) {
          state.isSuccess = true;
          let _menu = [...state.subMenu];
          _menu = _menu.filter((x) => x._id !== action.payload.Data);
          state.subMenu = _menu;
          state.filteredSubMenu = state.filteredSubMenu.filter(
            (y: any) => y._id !== action.payload.Data
          );
        } else {
          state.error = action.payload?.Error;
        }
      })
      .addCase(deleteSubMenu.rejected, (state, action) => {
        state.status = "failed";
        state.isSuccess = false;
        state.error = "";
      })

      .addCase(createSubMainMenu.pending, (state, action) => {
        state.error = "";
        state.isSuccess = false;
      })
      .addCase(createSubMainMenu.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload?.Success) {
          state.isSuccess = true;
          const _menu = [...state.subMenu];
          _menu.push(action.payload.Data);
          state.subMenu = _menu;
          state.filteredSubMenu.push(action.payload.Data);
        } else {
          state.error = action.payload?.Error;
        }
      })
      .addCase(createSubMainMenu.rejected, (state, action) => {
        state.status = "failed";
        state.isSuccess = false;
        state.error = "";
      })

      .addCase(updateSubMainMenu.pending, (state, action) => {
        state.error = "";
        state.isSuccess = false;
      })
      .addCase(updateSubMainMenu.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload?.Success) {
          state.isSuccess = true;
          let _menu = [...state.subMenu];
          var foundIndex = _menu.findIndex(
            (x) => x._id === action.payload.Data._id
          );
          let tempMenu: ISubMenu = {
            _id: action.payload.Data._id,
            mid: action.payload.Data.mid,
            name: action.payload.Data.name,
          };
          _menu[foundIndex] = tempMenu;
          state.subMenu = _menu;

          let _filteredSubMenu = [...state.filteredSubMenu];
          var foundIndex = _filteredSubMenu.findIndex(
            (x) => x._id === action.payload.Data._id
          );
          _filteredSubMenu[foundIndex] = tempMenu;
          state.filteredSubMenu = _filteredSubMenu;
        } else {
          state.error = action.payload?.Error;
        }
      })
      .addCase(updateSubMainMenu.rejected, (state, action) => {
        state.status = "failed";
        state.isSuccess = false;
        state.error = "";
      })

      .addCase(createContent.pending, (state, action) => {
        state.error = "";
        state.isSuccess = false;
      })
      .addCase(createContent.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload.Success) {
          state.isSuccess = true;
          const _content = [...state.filteredContent];
          _content.push(action.payload.Data);
          state.filteredContent = _content;
        } else {
          state.error = action.payload.Error;
          state.filteredContent = [];
          state.isSuccess = false;
        }
      })
      .addCase(createContent.rejected, (state, action) => {
        state.status = "failed";
        state.isSuccess = false;
        state.error = "";
      })

      .addCase(deleteContent.pending, (state, action) => {
        state.error = "";
        state.isSuccess = false;
      })
      .addCase(deleteContent.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload?.Success) {
          state.isSuccess = true;
          let _content = [...state.content];
          _content = _content.filter((x) => x._id !== action.payload.Data);
          state.content = _content;
          state.filteredContent = state.filteredContent.filter(
            (y: any) => y._id !== action.payload.Data
          );
        } else {
          state.error = action.payload?.Error;
        }
      })
      .addCase(deleteContent.rejected, (state, action) => {
        state.status = "failed";
        state.isSuccess = false;
        state.error = "";
      })

      .addCase(updateContent.pending, (state, action) => {
        state.error = "";
        state.isSuccess = false;
      })
      .addCase(updateContent.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload?.Success) {
          state.isSuccess = true;
          let _content = [...state.content];
          var foundIndex = _content.findIndex(
            (x) => x._id === action.payload.Data._id
          );
          let tempContent: IContent = {
            _id: action.payload.Data._id,
            smid: action.payload.Data.smid,
            name: action.payload.Data.name,
            value: action.payload.Data.value,
          };
          _content[foundIndex] = tempContent;
          state.content = _content;

          let _filteredContent = [...state.filteredContent];
          var foundIndex = _filteredContent.findIndex(
            (x) => x._id === action.payload.Data._id
          );
          _filteredContent[foundIndex] = tempContent;
          state.filteredContent = _filteredContent;
        } else {
          state.error = action.payload?.Error;
          state.content = [];
          state.filteredContent = [];
        }
      })
      .addCase(updateContent.rejected, (state, action) => {
        state.status = "failed";
        state.isSuccess = false;
        state.error = "";
      });
  },
});
export const { isUserLoggedIn, logout } = noteSlice.actions;

export default noteSlice.reducer;
