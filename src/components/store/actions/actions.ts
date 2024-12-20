import axios from "../../../axios-orders";
import {
  IUser,
  IOTPRequest,
  ILoginRequest,
  UserUpdateRequest,
  NewMainMenuRequest,
  MainMenuUpdateRequest,
  NewSubMainMenuRequest,
  ContentRequest,
} from "../../BAL/Type";
import { createAsyncThunk } from "@reduxjs/toolkit";
//New Actions
export const loginUser: any = createAsyncThunk(
  "loginUser",
  async (data: ILoginRequest) => {
    try {
      debugger;
      const response = await axios.post("/login", {
        username: data.username,
        password: data.password,
      });
      response.data.isAuthenticated = true;
      return response.data;
    } catch (err) {
      return { Success: false, Error: "Api falied" };
    }
  }
);

export const saveSignUp: any = createAsyncThunk(
  "saveSignUp",
  async (data: IUser) => {
    const response = await axios.post("/signup", {
      username: data.email,
      password: data.password,
    });
    console.log(response.data);
    response.data.token = "myToken";
    response.data.isAuthenticated = true;
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("expirationDate", "");
    localStorage.setItem("userId", response.data.email);
    localStorage.setItem("Email", response.data.email);
    localStorage.setItem("accountId", response.data._id);

    return response.data;
  }
);

export const generateOTP: any = createAsyncThunk(
  "generateOTP",
  async (data: IOTPRequest) => {
    const randomNum = Math.random() * 9000;
    const token = Math.floor(1000 + randomNum);
    const response = await axios.post("/create/otp", {
      username: data.username,
      password: data.password,
      otp: token,
    });
    return response.data;
  }
);

export const validOTP: any = createAsyncThunk(
  "validOTP",
  async (data: IOTPRequest) => {
    const response = await axios.post("/validate/otp", {
      username: data.username,
      password: data.username,
      otp: data.otp,
    });
    return response.data;
  }
);

export const getSubMenu: any = createAsyncThunk(
  "getSubMenu",
  async (data: string) => {
    const response = await axios.get("/get/subMenu?mid=" + data);
    return response.data;
  }
);

export const getMainMenu: any = createAsyncThunk(
  "getMainMenu",
  async (data: string) => {
    var response;
    try {
      response = await axios.get("/get/mainmenu?userId=" + data);
      return response.data;
    } catch (err) {
      return { Success: false, Error: "Api falied" };
    }
  }
);

export const getContent: any = createAsyncThunk(
  "getContent",
  async (data: string) => {
    try {
      const response = await axios.get("/get/content?smid=" + data);
      return response.data;
    } catch (err) {
      return { Success: false, Error: "Api falied" };
    }
  }
);

export const getUserInfo: any = createAsyncThunk(
  "getUserInfo",
  async (data: string) => {
    const response = await axios.get("/getuserinfo?email=" + data);
    return response.data;
  }
);

export const updateUserInfo: any = createAsyncThunk(
  "updateUserInfo",
  async (data: UserUpdateRequest) => {
    var response;
    try {
      response = await axios.put("/update/userinfo/" + data._id, data);
      return response?.data;
    } catch {
      console.log(response);
      return { Success: false, Error: "Api falied" };
    }
  }
);

export const createMainMenu: any = createAsyncThunk(
  "createMainMenu",
  async (data: NewMainMenuRequest) => {
    var response;
    try {
      response = await axios.post("/create/mainmenu", data);
      return response?.data;
    } catch {
      return { Success: false, Error: "Api falied" };
    }
  }
);

export const deleteMainMenu: any = createAsyncThunk(
  "deleteMainMenu",
  async (data: string) => {
    var response;
    try {
      response = await axios.delete("/delete/mainmenu?id=" + data);
      return response?.data;
    } catch {
      return { Success: false, Error: "Api falied" };
    }
  }
);

export const updateMainMenu: any = createAsyncThunk(
  "updateMainMenu",
  async (data: MainMenuUpdateRequest) => {
    var response;
    try {
      response = await axios.put("/update/mainmenu/" + data._id, {
        userId: data.userId,
        name: data.name,
      });
      return response?.data;
    } catch {
      return { Success: false, Error: "Api falied" };
    }
  }
);

export const deleteSubMenu: any = createAsyncThunk(
  "deleteSubMenu",
  async (data: string) => {
    var response;
    try {
      response = await axios.delete("/delete/submenu?id=" + data);
      return response?.data;
    } catch {
      return { Success: false, Error: "Api falied" };
    }
  }
);
export const createSubMainMenu: any = createAsyncThunk(
  "createSubMainMenu",
  async (data: NewSubMainMenuRequest) => {
    var response;
    try {
      response = await axios.post("/create/submenu", data);
      return response?.data;
    } catch {
      return { Success: false, Error: "Api falied" };
    }
  }
);
export const updateSubMainMenu: any = createAsyncThunk(
  "updateSubMainMenu",
  async (data: NewSubMainMenuRequest) => {
    var response;
    try {
      response = await axios.put("/update/submenu/" + data._id, {
        mid: data.mid,
        name: data.name,
      });
      return response?.data;
    } catch {
      return { Success: false, Error: "Api falied" };
    }
  }
);

export const createContent: any = createAsyncThunk(
  "createContent",
  async (data: ContentRequest) => {
    var response;
    try {
      response = await axios.post("/create/content", data);
      return response?.data;
    } catch {
      return { Success: false, Error: "Api falied" };
    }
  }
);

export const deleteContent: any = createAsyncThunk(
  "deleteContent",
  async (data: string) => {
    var response;
    try {
      response = await axios.delete("/delete/content?id=" + data);
      return response?.data;
    } catch {
      return { Success: false, Error: "Api falied" };
    }
  }
);

export const updateContent: any = createAsyncThunk(
  "updateContent",
  async (data: ContentRequest) => {
    var response;
    try {
      response = await axios.put("/update/content/" + data._id, {
        smid: data.smid,
        name: data.name,
        value: data.value,
      });
      return response?.data;
    } catch {
      return { Success: false, Error: "Api falied" };
    }
  }
);
