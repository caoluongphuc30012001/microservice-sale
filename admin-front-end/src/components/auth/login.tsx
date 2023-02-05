import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import style from "@/components/auth/style.module.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "@/actions/user";
import getConfig from "next/config";

type LoginFormProps = {
  email: string;
  password: string;
};

const onFinish = async (value: LoginFormProps) => {
  try {
    const { serverRuntimeConfig } = getConfig();
    console.log(serverRuntimeConfig)
    const url = serverRuntimeConfig.auth_url || "http://localhost:3000";
    const result = await axios.post(url+"/v1/api/auth/login", {
      email: value.email,
      password: value.email,
    });
    const user = result.data.data;
    const dispatch = useDispatch();
    if (user.email) {
      const action = login(user);

      dispatch(action);
    } else {
      [console.log(result.data.data)];
    }
  } catch (error) {
    console.error(error);
  }
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const LoginSection: React.FC = () => (
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

export default LoginSection;
