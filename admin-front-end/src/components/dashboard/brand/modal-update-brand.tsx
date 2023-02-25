import BrandType from "@/types/brand.type";
import openNotification from "@/utils/notification";
import { Button, Col, Form, FormInstance, Input, Modal, Row } from "antd";
import React, { useRef } from "react";
import { Exception } from "sass";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import axios from "axios";

type ModalUpdateBrandProps = {
  open: boolean;
  onClose: () => void;
  brand: BrandType;
  getListBrand: () => void;
};

function ModalUpdateBrand({
  open,
  onClose,
  brand,
  getListBrand,
}: ModalUpdateBrandProps) {
  const formRef = useRef<FormInstance>(null);
  const onSubmit = async () => {
    try {
      const saleURL = "http://localhost:4000";
      const brandPayload: BrandType = {
        id: brand.id,
        name: formRef.current?.getFieldValue("name"),
        description: formRef.current?.getFieldValue("description"),
        contry: formRef.current?.getFieldValue("contry"),
      };

      const result = await axios.put(saleURL + "/v1/api/brand", brandPayload);
      if (result.data.code == 0) {
        openNotification("Success", result.data.data, <CheckCircleOutlined />);
      } else
        openNotification("Error", result.data.data, <CloseCircleOutlined />);
      formRef.current?.resetFields();
      getListBrand();
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

      const result = await axios.delete(saleURL + "/v1/api/brand", {
        data: { id: brand.id },
      });
      if (result.data.code == 0) {
        openNotification("Success", result.data.data, <CheckCircleOutlined />);
      } else
        openNotification("Error", result.data.data, <CloseCircleOutlined />);
      formRef.current?.resetFields();
      getListBrand();
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
              initialValue={brand?.name}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="country"
              label="Quốc gia"
              rules={[
                { required: true, message: "Không được để trống quốc gia" },
              ]}
              initialValue={brand.contry}
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
              initialValue={brand?.description}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default ModalUpdateBrand;
