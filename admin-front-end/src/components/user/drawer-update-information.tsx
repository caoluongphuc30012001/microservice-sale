import UserType from "@/types/user.type";
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Space,
} from "antd";
import React, { useRef, useState } from "react";
import axios from "axios";
import type { FormInstance } from "antd/es/form";
import { useDispatch } from "react-redux";
import { login } from "@/reducers/user";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import openNotification from "@/utils/notification";
import { Exception } from "sass";
import { Upload } from "antd";
import { UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

type DrawerUpdateInformationProps = {
  open: boolean;
  onClose: () => void;
  user: Partial<UserType>;
};

type UploadResponseType = {
  public_id: string;
  url: string;
};

function DrawerUpdateInformation({
  open,
  onClose,
  user,
}: DrawerUpdateInformationProps) {
  const dispatch = useDispatch();
  const [avatarURL, setAvatarURL] = useState<string>();
  const [publicId, setPublicId] = useState<string>();

  //function delete image upload on server
  const onDelete = async () => {
    try {
      const url = "http://localhost:4000/v1/api/image";
      if (publicId) {
        await axios.delete(url + "/delete-image", {
          data: {
            public_id: publicId,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // function upload avatar
  const onUpload = async (response: UploadResponseType) => {
    try {
      await onDelete();
      setAvatarURL(response.url);
      setPublicId(response.public_id);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async (value: any) => {
    try {
      const saleURL = "http://localhost:4000";
      const userPayload: Partial<UserType> = {
        fullName: value.fullName,
        phoneNumber: value.phoneNumber,
        birthday: value.birthday?.format("YYYY-MM-DD"),
        avatar: avatarURL || user.avatar,
        province: value.province,
        district: value.district,
        ward: value.ward,
        street: value.street,
      };
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
      <Row
        justify="center"
        style={{
          marginBottom: "20px",
        }}
      >
        <Col>
          <Upload
            maxCount={1}
            onChange={({ file }) => {
              if (file.response) {
                onUpload(file.response.data);
              }
            }}
            action="http://localhost:4000/v1/api/image/upload-image"
            showUploadList={false}
          >
            <Avatar
              style={{
                cursor: "pointer",
              }}
              src={avatarURL || user.avatar}
              size={100}
              icon={<UserOutlined />}
            />
          </Upload>
        </Col>
      </Row>
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
              <Input />
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
              initialValue={dayjs(user.birthday)}
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
