import UserType from "@/types/user.type";
import openNotification from "@/utils/notification";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CloseCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Row, Table, Typography } from "antd";
import DrawerUpdateUser from "./drawer-update-user";
import { Exception } from "sass";

const { Title } = Typography;

function UserSection() {
  const [data, setData] = useState<UserType[]>([]);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<Partial<UserType>>();
  const [search, setSearch] = useState<string>("");
  //function get list user
  const getListUser = async (search: string = "") => {
    try {
      const url = "http://localhost:4000";
      const result = await axios.post(url + "/v1/api/user/get-list-user", {
        search,
      });
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
  //function handle close drawer to update information

  const onClose = () => {
    setOpen(false);
    setUser(undefined);
  };

  const onOpen = (user: Partial<UserType>) => {
    setUser(user);
    setOpen(true);
  };

  //get list user first render
  useEffect(() => {
    getListUser();
  }, []);

  // define column
  const columns: ColumnsType<Partial<UserType>> = [
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      width: "20%",
      sorter: (a, b) => {
        return a.fullName?.localeCompare(b.fullName as string) as number;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      width: "10%",
    },
    {
      title: "Ngày sinh",
      render: (_, record) =>
        new Date(record.birthday as string).toLocaleDateString(),
      width: "15%",
    },
    {
      title: "Địa chỉ",
      render: (_, record) => {
        let address = record.street ? record.street : "";
        address += record.ward ? ", " + record.ward : "";
        address += record.district ? ", " + record.district : "";
        address += record.province ? ", " + record.province : "";
        return address;
      },
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      width: "10%",
    },
    {
      title: "Tình trạng",
      render: (value) => (value === true ? "Đang hoạt động" : "Chờ xác thực"),
      width: "10%",
    },
  ];

  //function to handle search

  function onSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.code === "Enter") {
      getListUser(search);
    } else if (e.code === "Backspace" && search === "") getListUser();
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
        <Title level={4}>Tìm kiếm</Title>
        <Input
          placeholder="Nhập từ khóa"
          prefix={<SearchOutlined />}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyUp={onSearch}
        />
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
      />
      {user && (
        <DrawerUpdateUser
          onClose={onClose}
          open={open}
          user={user}
          title="Chỉnh sửa thông tin người dùng"
          isUpdate={true}
          getListUser={getListUser}
        />
      )}
    </>
  );
}

export default UserSection;
