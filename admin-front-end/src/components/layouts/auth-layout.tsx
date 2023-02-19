import React, { useEffect } from "react";
import { Layout } from "antd";
import MenuCustom from "../common/menu";
import style from "@/components/layouts/style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import axios from "axios";
import { login } from "@/reducers/user";
import { useRouter } from "next/router";
import openNotification from "@/utils/notification";
import { CloseCircleOutlined } from "@ant-design/icons";
const { Header, Content } = Layout;

type AuthLayoutProps = {
  children: React.ReactNode;
};
function AuthLayout({ children }: AuthLayoutProps) {
  const { fullName } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const getOwnInformation = async () => {
    try {
      const urlSale = process.env.BACKEND_AUTH_URL || "http://localhost:4000";
      const result = await axios.get(
        urlSale + "/v1/api/user/get-own-information"
      );
      if (result.data.code !== 201) {
        dispatch(login(result.data.data));
      }
    } catch (error) {
      openNotification(
        "Error",
        (error as any).response.data.message,
        <CloseCircleOutlined />
      );
    }
  };
  useEffect(() => {
    if (!fullName) {
      getOwnInformation();
    } else {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullName]);
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

export default AuthLayout;
