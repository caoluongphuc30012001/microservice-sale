import { Avatar, Dropdown, Menu, MenuProps, Space } from "antd";
import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import style from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/reducers/user";
import { RootState } from "@/store";
import { UserOutlined } from "@ant-design/icons";
import logo from "/public/logo/logo.png";

function MenuCustom() {
  const dispatch = useDispatch();
  const { avatar, fullName } = useSelector((state: RootState) => state.user);
  const listItem = useRef<any[]>([
    {
      label: "Sản phẩm",
      href: "/products",
      id: 0,
    },
    { label: "Người dùng", href: "/users", id: 1 },
    {
      label: "Đơn đặt hàng",
      href: "/orders",
      id: 2,
    },
    {
      label: "Hóa đơn",
      href: "/payments",
      id: 3,
    },
  ]);

  const clearToken = () => {
    window.localStorage.clear();
  };
  const subMenu: MenuProps["items"] = [
    {
      label: <a href="/user/profile">Profile</a>,
      key: 0,
    },
    {
      label: (
        <p
          onClick={() => {
            clearToken();
            dispatch(logout());
          }}
        >
          Logout
        </p>
      ),
      key: 1,
    },
  ];
  return fullName ? (
    <div className={style["menu-container"]}>
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={["0"]}
        items={listItem.current.map((item) => {
          return {
            key: item.id,
            label: <Link href={item.href}>{item.label}</Link>,
          };
        })}
        className={style["menu-main"]}
      />
      <Dropdown menu={{ items: subMenu }} trigger={["click"]}>
        <a
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <Avatar src={avatar} icon={<UserOutlined />} />
        </a>
      </Dropdown>
    </div>
  ) : (
    <div className={style["menu-container"]}>
      <Image src={logo} alt="logo" height={60} />
      <div className={style["group-button"]}>
        <Link href="/auth/login" className={style["menu-button"]}>
          Đăng nhập
        </Link>
        <Link href="/auth/register" className={style["menu-button"]}>
          Đăng kí
        </Link>
      </div>
    </div>
  );
}

export default MenuCustom;
