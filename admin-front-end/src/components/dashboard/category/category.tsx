import openNotification from "@/utils/notification";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CloseCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Table, Typography } from "antd";
import { Exception } from "sass";
import CategoryType from "@/types/category.type";
import ModalUpdateCategory from "./modal-update-category";
import ModalCreateCategory from "./modal-create-category";

const { Title, Text } = Typography;

function CategorySection() {
  const [data, setData] = useState<CategoryType[]>([]);
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<CategoryType>();
  const [isUpdate, setIsUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const onUpdate = (category: CategoryType) => {
    setCategory(category);
    setIsUpdate(true);
    setOpen(true);
  };

  const onCancel = () => {
    setOpen(false);
  };

  const onCreate = () => {
    setIsUpdate(false);
    setOpen(true);
  };

  //get list category

  const getListCategory = async (search?: string) => {
    try {
      const url = "http://localhost:4000";
      const result = await axios.get(url + "/v1/api/category");
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

  //get list user first render
  useEffect(() => {
    getListCategory();
  }, []);

  // define column
  const columns: ColumnsType<CategoryType> = [
    {
      title: "Tên",
      dataIndex: "name",
      width: "10%",
      sorter: (a, b) => {
        return a.name?.localeCompare(b.name as string) as number;
      },
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      width: "20%",
    },
  ];

  //function to handle search

  function onSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.code === "Enter") {
      getListCategory(search);
    } else if (e.code === "Backspace" && search === "") getListCategory();
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
              onUpdate(record);
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
      {isUpdate && category && (
        <ModalUpdateCategory
          open={open}
          onClose={onCancel}
          category={category}
          getListcategory={getListCategory}
        />
      )}
      {!isUpdate && (
        <ModalCreateCategory
          open={open}
          onClose={onCancel}
          getListcategory={getListCategory}
        />
      )}
    </>
  );
}

export default CategorySection;
