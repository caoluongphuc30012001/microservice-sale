// create table User(
//   id int PRIMARY KEY auto_increment not null,
//   email varchar(255) not null,
//   password varchar(255) not null,
//   fullName varchar(255) not null,
//   phoneNumber varchar(10),
//   birthday date,
//   avatar varchar(255),
//   street varchar(40),
//   ward varchar(20),
//   district varchar(20),
//   province varchar(20),
//   role varchar(10) not null default 'guest',
//   isActive boolean not null default false,
//   UNIQUE(email)
// );

import UserType from "@/types/user.type";
import { createAction, createReducer } from "@reduxjs/toolkit";

const initialstate: Partial<UserType> = {
  id: null,
  email: null,
  fullName: null,
  phoneNumber: null,
  birthday: null,
  avatar: null,
  street: null,
  ward: null,
  district: null,
  province: null,
  role: null,
};
// {
//   login: (_, action) => {
//     return action.payload;
//   },
//   logout: () => {
//     return {
//       id: null,
//       email: null,
//       fullName: null,
//       phoneNumber: null,
//       birthday: null,
//       avatar: null,
//       street: null,
//       ward: null,
//       district: null,
//       province: null,
//       role: null,
//     };
//   },
// }

const login = createAction<UserType>("user/login");
const logout = createAction("user/logout");
const userReducer = createReducer(initialstate, (builder) => {
  builder
    .addCase(login, (_, action) => {
      return action.payload;
    })
    .addCase(logout, (_, __) => {
      return {
        id: null,
        email: null,
        fullName: null,
        phoneNumber: null,
        birthday: null,
        avatar: null,
        street: null,
        ward: null,
        district: null,
        province: null,
        role: null,
      };
    });
});

export default userReducer;
export { login, logout };
