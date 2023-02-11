import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import style from "@/components/auth/style.module.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import openNotification from "@/utils/notification";
import { CloseCircleOutlined } from "@ant-design/icons";
import { login } from "@/actions/user";
import token from "@/utils/token";

type TypeValueForm = {
  email: string;
  password: string;
};

const LoginSection: React.FC = () => {
  const dispatch = useDispatch();
  const onFinish = async ({ email, password }: TypeValueForm) => {
    try {
      const urlAuth = process.env.BACKEND_AUTH_URL || "http://localhost:3000";
      const result = await axios.post(urlAuth + "/v1/api/auth/login", {
        email,
        password,
      });
      if (result.data.data.accessToken) {
        token.setAccessToken(result.data.data.accessToken);
        token.setRefreshToken(result.data.data.refreshToken);
        const urlSale = process.env.BACKEND_AUTH_URL || "http://localhost:4000";
        const result1 = await axios.get(
          urlSale + "/v1/api/user/get-own-information"
        );
        console.log(result1.data);
      } else {
        openNotification("Error", result.data.data, <CloseCircleOutlined />);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className={style["login-form-container"]}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className={style["login-form"]}
      >
        <Form.Item
          label="email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginSection;
