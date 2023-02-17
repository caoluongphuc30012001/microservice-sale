import UserType from "@/types/user.type";
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Space } from "antd";
import React, { useRef } from "react";
import { Dayjs } from "dayjs";
import axios from "axios";
import type { FormInstance } from "antd/es/form";
import { useDispatch } from "react-redux";
import { login } from "@/reducers/user";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import openNotification from "@/utils/notification";
import { Exception } from "sass";

type DrawerUpdateInformationProps = {
  open: boolean;
  onClose: () => void;
  user: Partial<UserType>;
};

function DrawerUpdateInformation({
  open,
  onClose,
  user,
}: DrawerUpdateInformationProps) {
  const dispatch = useDispatch();
  const onSubmit = async (value: any) => {
    try {
      const saleURL = "http://localhost:4000";
      const userPayload: Partial<UserType> = {
        fullName: value.fullName,
        phoneNumber: value.phoneNumber,
        birthday: value.birthday?.format("YYYY-MM-DD"),
        avatar: value.avatar,
        province: value.province,
        district: value.district,
        ward: value.ward,
        street: value.street,
      };
      console.log(userPayload);
      const result = await axios.put(
        saleURL + "/v1/api/user/update-own-information",
        userPayload
      );
      if (result.data.code == 0) {
        openNotification("Success", result.data.data, <CheckCircleOutlined />);
        dispatch(login(userPayload as UserType));
      } else
        openNotification("Error", result.data.data, <CloseCircleOutlined />);
      formRef.current?.resetFields();
      onClose();
    } catch (error) {
      openNotification(
        "Error",
        (error as Exception).message,
        <CloseCircleOutlined />
      );
    }
  };
  const formRef = useRef<FormInstance>(null);
  return (
    <Drawer
      title="Chỉnh sửa thông tin tài khoản"
      width={720}
      onClose={onClose}
      open={open}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Form
        layout="vertical"
        hideRequiredMark
        onFinish={onSubmit}
        ref={formRef}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="fullName"
              label="Họ và tên"
              rules={[{ required: true, message: "Không được để trống tên" }]}
              initialValue={user.fullName}
            >
              <Input
                placeholder="Please enter user name"
                // defaultValue={user.fullName || ""}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phoneNumber"
              label="Số điện thoại"
              initialValue={user.phoneNumber}
            >
              <Input
                style={{ width: "100%" }}
                // defaultValue={user.phoneNumber || ""}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="province"
              label="Tỉnh / Thành phố"
              initialValue={user.province}
            >
              <Input
              // defaultValue={user.province || ""}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="district"
              label="Quận / Huyện"
              initialValue={user.district}
            >
              <Input
                style={{ width: "100%" }}
                // defaultValue={user.district || ""}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="ward" label="Xã / Phường" initialValue={user.ward}>
              <Input
              // defaultValue={user.ward || ""}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="street" label="Đường" initialValue={user.street}>
              <Input
                style={{ width: "100%" }}
                // defaultValue={user.street || ""}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="birthday"
              label="Ngày tháng năm sinh"
              // initialValue={user.birthday}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item>
              <Space>
                <Button onClick={onClose}>Hủy</Button>
                <Button type="primary" htmlType="submit">
                  Chỉnh sửa
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}

export default DrawerUpdateInformation;
