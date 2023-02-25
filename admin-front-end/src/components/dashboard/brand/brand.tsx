import openNotification from "@/utils/notification";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CloseCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Table, Typography } from "antd";
import { Exception } from "sass";
import BrandType from "@/types/brand.type";
import ModalUpdateBrand from "./modal-update-brand";
import ModalCreateBrand from "./modal-create-brand";

const { Title } = Typography;

function BrandSection() {
  const [data, setData] = useState<BrandType[]>([]);
  const [search, setSearch] = useState<string>("");
  const [brand, setBrand] = useState<BrandType>();
  const [isUpdate, setIsUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const onUpdate = (brand: BrandType) => {
    setBrand(brand);
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

  //get list brand

  const getListBrand = async (search?: string) => {
    try {
      const url = "http://localhost:4000";
      const result = await axios.get(url + "/v1/api/brand");
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
    getListBrand();
  }, []);

  // define column
  const columns: ColumnsType<BrandType> = [
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
    {
      title: "Quốc gia",
      dataIndex: "country",
      width: "10%",
    },
  ];

  //function to handle search

  function onSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.code === "Enter") {
      getListBrand(search);
    } else if (e.code === "Backspace" && search === "") getListBrand();
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
      {isUpdate && brand && (
        <ModalUpdateBrand
          open={open}
          onClose={onCancel}
          brand={brand}
          getListBrand={getListBrand}
        />
      )}
      {!isUpdate && (
        <ModalCreateBrand
          open={open}
          onClose={onCancel}
          getListBrand={getListBrand}
        />
      )}
    </>
  );
}

export default BrandSection;
