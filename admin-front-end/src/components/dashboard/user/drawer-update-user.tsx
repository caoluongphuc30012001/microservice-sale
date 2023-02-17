import UserType from "@/types/user.type";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Modal,
  Row,
  Space,
} from "antd";
import React, { useRef, useState } from "react";
import axios from "axios";
import type { FormInstance } from "antd/es/form";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import openNotification from "@/utils/notification";
import { Exception } from "sass";

type DrawerUpdateUserProps = {
  open: boolean;
  onClose: () => void;
  user: Partial<UserType>;
  title: string;
  isUpdate: boolean;
  getListUser: () => void;
};

function DrawerUpdateUser({
  open,
  onClose,
  user,
  title,
  getListUser,
}: DrawerUpdateUserProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //function handle modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    onDelete();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //function handle submit form
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
        id: user.id,
      };
      const result = await axios.put(saleURL + "/v1/api/user", userPayload);
      if (result.data.code == 0) {
        openNotification("Success", result.data.data, <CheckCircleOutlined />);
      } else
        openNotification("Error", result.data.data, <CloseCircleOutlined />);
      formRef.current?.resetFields();
      getListUser();
      onClose();
    } catch (error) {
      openNotification(
        "Error",
        (error as Exception).message,
        <CloseCircleOutlined />
      );
    }
  };
  const onDelete = async () => {
    try {
      const saleURL = "http://localhost:4000";
      const result = await axios.delete(saleURL + "/v1/api/user", {
        data: { id: user.id },
      });
      openNotification("Success", result.data.data, <CheckCircleOutlined />);
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
    <>
      <Drawer
        title={title}
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
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phoneNumber"
                label="Số điện thoại"
                initialValue={user.phoneNumber}
              >
                <Input style={{ width: "100%" }} />
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
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="district"
                label="Quận / Huyện"
                initialValue={user.district}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="ward"
                label="Xã / Phường"
                initialValue={user.ward}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="street" label="Đường" initialValue={user.street}>
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="birthday" label="Ngày tháng năm sinh">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item>
                <Space>
                  <Button onClick={onClose}>Hủy</Button>
                  <Button danger onClick={showModal}>
                    Xóa
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Chỉnh sửa
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{`Bạn có chắc muốn xóa tài khoản ${user.fullName} không?`}</p>
      </Modal>
    </>
  );
}

export default DrawerUpdateUser;
