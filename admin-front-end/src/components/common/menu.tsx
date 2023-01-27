import { Menu } from "antd";
import React, { useRef } from "react";
import Link from "next/link";

function MenuCustom() {
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
  return (
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
    />
  );
}

export default MenuCustom;
