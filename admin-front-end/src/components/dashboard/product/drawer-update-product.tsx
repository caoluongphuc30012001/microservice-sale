import {
  Avatar,
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import type { FormInstance } from "antd/es/form";
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import openNotification from "@/utils/notification";
import { Exception } from "sass";
import { ProductDetailType, ProductType } from "@/types/product.type";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import UploadFileCustom from "@/components/common/upload-file";
import CategoryType from "@/types/category.type";

type DrawerUpdateProductProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  getListProduct: () => void;
  productId: number;
};

function DrawerUpdateProduct({
  open,
  onClose,
  title,
  getListProduct,
  productId,
}: DrawerUpdateProductProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState<ProductDetailType & ProductType>();
  const listCategory = useSelector((state: RootState) => state.category);
  const listBrand = useSelector((state: RootState) => state.brand);
  const [avatarURL, setAvatarURL] = useState<string>();
  const [publicId, setPublicId] = useState<string>();

  //function handle get product details
  const getProductDetail = async (productId: number) => {
    try {
      const url = "http://localhost:4000";
      const result = await axios.get(url + "/v1/api/product" + `/${productId}`);
      if (result.status !== 200) {
        openNotification("Error", result.data.message, <CloseCircleOutlined />);
      } else setProduct(result.data.data);
    } catch (error) {
      openNotification(
        "Error",
        (error as any).message,
        <CloseCircleOutlined />
      );
    }
  };

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
      console.log(value);
      const saleURL = "http://localhost:4000";
      const productPayload: Partial<ProductType> & Partial<ProductDetailType> =
        {
          id: productId,
          categoryId: value.categoryId,
          name: value.name,
          price: value.price,
          quantity: value.quantity,
          image: avatarURL,
          description: value.description,
          brandId: value.brandId,
          code: value.code,
        };
      const result = await axios.put(
        saleURL + "/v1/api/product",
        productPayload
      );
      if (result.data.code == 0) {
        openNotification("Success", result.data.data, <CheckCircleOutlined />);
      } else
        openNotification("Error", result.data.data, <CloseCircleOutlined />);
      formRef.current?.resetFields();
      getListProduct();
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
      const result = await axios.delete(saleURL + "/v1/api/product", {
        data: { id: productId, productId: product?.productId },
      });
      openNotification("Success", result.data.data, <CheckCircleOutlined />);
      getListProduct();
      onClose();
    } catch (error) {
      openNotification(
        "Error",
        (error as Exception).message,
        <CloseCircleOutlined />
      );
    }
  };
  // get product details
  useEffect(() => {
    getProductDetail(productId);
  }, [productId]);

  const formRef = useRef<FormInstance>(null);
  return product ? (
    <>
      <Drawer
        title={title}
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <UploadFileCustom
          setUrl={(result) => {
            setAvatarURL(result);
          }}
          urlAction="http://localhost:4000/v1/api/image/upload-image"
          publicProps={{
            publicId: publicId,
            setPublicId: (id) => {
              setPublicId(id);
            },
          }}
        >
          <Avatar
            style={{
              cursor: "pointer",
            }}
            src={avatarURL || product.image}
            size={50}
            icon={<UploadOutlined />}
            shape="square"
          />
        </UploadFileCustom>
        <Form
          layout="vertical"
          hideRequiredMark
          onFinish={onSubmit}
          ref={formRef}
          style={{
            marginTop: 20,
          }}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="name"
                label="Tên sản phẩm"
                rules={[{ required: true, message: "Không được để trống tên" }]}
                initialValue={product?.name}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="price"
                label="Giá"
                initialValue={product?.price}
                rules={[
                  { required: true, message: "Không được để trống giá tiền" },
                ]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="quantity"
                label="Số lượng"
                initialValue={product?.quantity}
                rules={[
                  { required: true, message: "Không được để trống số lượng" },
                ]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="code"
                label="Mã code"
                initialValue={product?.code}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="categoryId"
                label="Danh mục"
                initialValue={product?.categoryId}
              >
                <Select placeholder="Chọn danh mục">
                  {listCategory.map((category: CategoryType) => {
                    return (
                      <Select.Option key={category.id} value={category.id}>
                        {category.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="brandId"
                label="Hãng"
                initialValue={product?.brandId}
              >
                <Select placeholder="Chọn danh mục">
                  {listBrand.map((brand: CategoryType) => {
                    return (
                      <Select.Option key={brand.id} value={brand.id}>
                        {brand.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Mô tả"
                initialValue={product?.description}
              >
                <Input.TextArea rows={4} />
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
        <p>{`Bạn có chắc muốn xóa sản phẩm ${product?.name} không?`}</p>
      </Modal>
    </>
  ) : (
    <></>
  );
}

export default DrawerUpdateProduct;
