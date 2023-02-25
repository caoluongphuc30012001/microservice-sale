import { Avatar, Dropdown, Menu, MenuProps } from "antd";
import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import style from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/reducers/user";
import { RootState } from "@/store";
import { UserOutlined } from "@ant-design/icons";
import logo from "/public/logo/logo.png";
import { useRouter } from "next/router";

function MenuCustom() {
  const dispatch = useDispatch();
  const { avatar, fullName } = useSelector((state: RootState) => state.user);
  const listItem = useRef<any[]>([
    {
      label: "Sản phẩm",
      href: "/dashboard/product",
      id: 0,
    },
    { label: "Người dùng", href: "/dashboard/user", id: 1 },
    {
      label: "Danh mục",
      href: "/dashboard/category",
      id: 2,
    },
    {
      label: "Hãng",
      href: "/dashboard/brand",
      id: 3,
    },
  ]);
  const router = useRouter();

  const clearToken = () => {
    window.localStorage.clear();
  };
  const subMenu: MenuProps["items"] = [
    {
      label: <Link href="/user/profile">Profile</Link>,
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
            key: item.href,
            label: <Link href={item.href}>{item.label}</Link>,
          };
        })}
        className={style["menu-main"]}
        activeKey={router.pathname}
      />
      <Dropdown menu={{ items: subMenu }} trigger={["click"]}>
        <Link
          href=""
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <Avatar src={avatar} icon={<UserOutlined />} />
        </Link>
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
