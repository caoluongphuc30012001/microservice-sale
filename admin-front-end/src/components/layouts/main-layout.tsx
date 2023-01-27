import React from "react";
import { Layout } from "antd";
import MenuCustom from "../common/menu";
import style from "@/components/layouts/style.module.scss";
const { Header, Content, Footer } = Layout;

type MainLayoutProps = {
  children: React.ReactNode;
};
function MainLayout({ children }: MainLayoutProps) {
  return (
    <Layout>
      <Header className={style["layout-header-container"]}>
        <MenuCustom />
      </Header>
      <Content className={style["layout-content-container"]}>
        {children}
      </Content>
    </Layout>
  );
}

export default MainLayout;
