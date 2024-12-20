export interface IMainMenu {
  _id: string;
  userId: string;
  name: string;
}
export interface ISubMenu {
  _id: string;
  mid: string;
  name: string;
}

export interface IContent {
  _id: string;
  smid: string;
  name: string;
  value: string;
}
export interface IUser {
  _id: string;
  image: string;
  name: string;
  email: string;
  password: string;
  Mobile: string;
  profession: string;
  userId: string;
  active: boolean;
}

export type UserUpdateRequest = {
  _id: string | null;
  image: string | null;
  name: string;
  Mobile: string;
  profession: string;
};

export interface IOTPRequest {
  username: string;
  password: string;
  otp: number;
}

export interface ILoginRequest {
  username: string;
  password: string;
}

export type NewMainMenuRequest = {
  userId: string | null;
  name: string;
};

export type MainMenuUpdateRequest = {
  _id: string | null;
  userId: string | null;
  name: string | null;
};

export type NewSubMainMenuRequest = {
  _id: string | null;
  mid: string | null;
  name: string | null;
};
export type ContentRequest = {
  _id: string;
  smid: string;
  name: string;
  value: string;
};
