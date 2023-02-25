import openNotification from "@/utils/notification";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CloseCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Input, Row, Table, Typography } from "antd";
import { Exception } from "sass";
import { ProductType } from "@/types/product.type";
import DrawerUpdateProduct from "./drawer-update-product";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "@/reducers/category";
import { RootState } from "@/store";
import { setBrand } from "@/reducers/brand";
import DrawerCreateProduct from "./drawer-create-product";
import CategoryType from "@/types/category.type";

const { Title, Text } = Typography;

function ProductSection() {
  const [data, setData] = useState<ProductType[]>([]);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<ProductType>();
  const [search, setSearch] = useState<string>("");
  const [isUpdate, setIsUpdate] = useState(true);
  const dispatch = useDispatch();
  const listCategory = useSelector((state: RootState) => state.category);
  //list of filter category
  const filterCategory = listCategory.map((category) => {
    return {
      value: category.id,
      text: category.name,
    };
  });
  //function open drawer to create
  const onCreate = () => {
    setIsUpdate(false);
    setOpen(true);
  };

  //function get list brand

  const getListBrand = async () => {
    try {
      const url = "http://localhost:4000";
      const result = await axios.get(url + "/v1/api/brand");
      if (result.status !== 200) {
        openNotification("Error", result.data.message, <CloseCircleOutlined />);
      } else dispatch(setBrand(result.data.data));
    } catch (error) {
      openNotification(
        "Error",
        (error as Exception).message,
        <CloseCircleOutlined />
      );
    }
  };
  //function get list user
  const getListProduct = async (search: string = "") => {
    try {
      const url = "http://localhost:4000";
      const result = await axios.get(url + "/v1/api/product");
      if (result.status !== 200) {
        openNotification("Error", result.data.message, <CloseCircleOutlined />);
      } else setData(result.data.data);
    } catch (error) {
      openNotification(
        "Error",
        (error as Exception).message,
        <CloseCircleOutlined />
      );
    }
  };

  //get list category

  const getListCategory = async () => {
    try {
      const url = "http://localhost:4000";
      const result = await axios.get(url + "/v1/api/category");
      if (result.status !== 200) {
        openNotification("Error", result.data.message, <CloseCircleOutlined />);
      } else dispatch(setCategory(result.data.data));
    } catch (error) {
      openNotification(
        "Error",
        (error as Exception).message,
        <CloseCircleOutlined />
      );
    }
  };
  //function handle close drawer to update information

  const onClose = () => {
    setOpen(false);
    setProduct(undefined);
  };

  const onOpen = (product: ProductType) => {
    setProduct(product);
    setIsUpdate(true);
    setOpen(true);
  };

  //get list user first render
  useEffect(() => {
    getListCategory();
    getListBrand();
    getListProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // define column
  const columns: ColumnsType<ProductType> = [
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (value) => {
        return (
          <Avatar
            style={{
              width: "auto",
              height: "40px",
            }}
            src={value}
            shape="square"
          />
        );
      },
      width: "10%",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      width: "20%",
      sorter: (a, b) => {
        return a.name?.localeCompare(b.name as string) as number;
      },
    },
    {
      title: "Giá",
      dataIndex: "price",
      width: "20%",
      sorter: (a, b) => {
        return a.price - b.price;
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      width: "10%",
    },
    {
      title: "Số sao đánh giá",
      dataIndex: "star",
      sorter: (a, b) => {
        return a.star - b.star;
      },
      width: "10%",
    },
    {
      title: "Danh mục",
      dataIndex: "categoryId",
      render: (value) => {
        const category = listCategory.find(
          (category: CategoryType) => category.id === value
        );
        return <Text>{category?.name}</Text>;
      },
      width: "10%",
      filters: filterCategory,
      onFilter: (value, record) => {
        return record.categoryId === value;
      },
    },
  ];

  //function to handle search

  function onSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.code === "Enter") {
      getListProduct(search);
    } else if (e.code === "Backspace" && search === "") getListProduct();
  }
  return (
    <>
      <Row
        style={{
          position: "absolute",
          top: "70px",
          left: "5%",
        }}
      >
        <Title
          style={{
            width: "100%",
          }}
          level={4}
        >
          Tìm kiếm
        </Title>
        <Row>
          <Col>
            <Input
              placeholder="Nhập từ khóa"
              prefix={<SearchOutlined />}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onKeyUp={onSearch}
            />
          </Col>
          <Col>
            <Button
              style={{
                marginLeft: 10,
              }}
              type="primary"
              onClick={onCreate}
            >
              Thêm mới
            </Button>
          </Col>
        </Row>
      </Row>
      <Table
        columns={columns}
        dataSource={data}
        size="large"
        onRow={(record) => {
          return {
            onClick: () => {
              onOpen(record);
            },
          };
        }}
        style={{
          width: "90%",
          marginTop: "100px",
        }}
        rowKey={(record) => {
          return record.id;
        }}
      />
      {/* {user && (
        <DrawerUpdateUser
          onClose={onClose}
          open={open}
          user={user}
          title="Chỉnh sửa thông tin người dùng"
          isUpdate={true}
          getListProduct={getListProduct}
        />
      )} */}
      {isUpdate && product && (
        <DrawerUpdateProduct
          open={open}
          onClose={onClose}
          productId={product.id}
          getListProduct={getListProduct}
          title="chỉnh sửa thông tin sản phẩm"
        />
      )}
      {!isUpdate && (
        <DrawerCreateProduct
          open={open}
          onClose={onClose}
          getListProduct={getListProduct}
          title="Tạo sản phẩm mới"
        />
      )}
    </>
  );
}

export default ProductSection;
