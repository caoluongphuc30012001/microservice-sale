import React from "react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import style from "./style.module.scss";
import { Avatar, Button, Typography } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";

const { Title } = Typography;

function ProfileSection() {
  const user = useSelector((state: RootState) => state.user);
  return (
    <div className={style["profile-page-container"]}>
      <div className={style["avatar-group-box"]}>
        <Avatar
          shape="circle"
          size={200}
          src={user.avatar}
          icon={<UserOutlined />}
        />
        <div className={style["btn-group"]}>
          <Title level={2}>{user.fullName}</Title>
          <Button>
            <EditOutlined />
            Chỉnh sửa trang cá nhân
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProfileSection;
