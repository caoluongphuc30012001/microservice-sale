import CategoryType from "@/types/category.type";
import openNotification from "@/utils/notification";
import { Button, Col, Form, FormInstance, Input, Modal, Row } from "antd";
import React, { useRef } from "react";
import { Exception } from "sass";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import axios from "axios";

type ModalCreateCategoryProps = {
  open: boolean;
  onClose: () => void;
  getListcategory: () => void;
};

function ModalCreateCategory({
  open,
  onClose,
  getListcategory,
}: ModalCreateCategoryProps) {
  const formRef = useRef<FormInstance>(null);
  const onSubmit = async () => {
    try {
      const saleURL = "http://localhost:4000";
      const categoryPayload = {
        name: formRef.current?.getFieldValue("name"),
        description: formRef.current?.getFieldValue("description"),
      };

      const result = await axios.post(
        saleURL + "/v1/api/category",
        categoryPayload
      );
      if (result.data.code == 0) {
        openNotification("Success", result.data.data, <CheckCircleOutlined />);
      } else
        openNotification("Error", result.data.data, <CloseCircleOutlined />);
      formRef.current?.resetFields();
      getListcategory();
      onClose();
    } catch (error) {
      openNotification(
        "Error",
        (error as Exception).message,
        <CloseCircleOutlined />
      );
    }
  };
  return (
    <Modal
      open={open}
      onCancel={onClose}
      title="Tạo danh mục mới"
      footer={[
        <Button key="back" onClick={onClose}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={onSubmit}>
          Tạo mới
        </Button>,
      ]}
    >
      <Form
        layout="vertical"
        hideRequiredMark
        ref={formRef}
        style={{
          marginTop: 20,
        }}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="name"
              label="Tên danh mục"
              rules={[{ required: true, message: "Không được để trống tên" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="description" label="Mô tả">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default ModalCreateCategory;
