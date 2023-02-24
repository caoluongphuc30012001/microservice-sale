import CategoryType from "@/types/category.type";
import openNotification from "@/utils/notification";
import { Button, Col, Form, FormInstance, Input, Modal, Row } from "antd";
import React, { useRef } from "react";
import { Exception } from "sass";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import axios from "axios";

type ModalUpdateCategoryProps = {
  open: boolean;
  onClose: () => void;
  category: CategoryType;
  getListcategory: () => void;
};

function ModalUpdateCategory({
  open,
  onClose,
  category,
  getListcategory,
}: ModalUpdateCategoryProps) {
  const formRef = useRef<FormInstance>(null);
  const onSubmit = async () => {
    try {
      const saleURL = "http://localhost:4000";
      const categoryPayload = {
        id: category.id,
        name: formRef.current?.getFieldValue("name"),
        description: formRef.current?.getFieldValue("description"),
      };

      const result = await axios.put(
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
  const onDelete = async () => {
    try {
      const saleURL = "http://localhost:4000";

      const result = await axios.delete(saleURL + "/v1/api/category", {
        data: { id: category.id },
      });
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
      title="Chỉnh sửa thông tin danh mục"
      footer={[
        <Button key="back" onClick={onClose}>
          Hủy
        </Button>,
        <Button danger type="primary" key="delete" onClick={onDelete}>
          Xóa
        </Button>,
        <Button key="submit" type="primary" onClick={onSubmit}>
          Chỉnh sửa
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
              initialValue={category?.name}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Mô tả"
              initialValue={category?.description}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default ModalUpdateCategory;
