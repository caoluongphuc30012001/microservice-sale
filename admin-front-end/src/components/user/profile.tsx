import React, { useState } from "react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import style from "./style.module.scss";
import { Avatar, Button, Row, Space, Typography } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import DrawerUpdateInformation from "./drawer-update-information";

const { Title, Text } = Typography;

function ProfileSection() {
  const user = useSelector((state: RootState) => state.user);
  const [open, setOpen] = useState(false);
  //function handle close drawer to update information

  const onClose = () => {
    setOpen(false);
  }

  const onOpen = () => {
    setOpen(true)
  }
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
          <Button
            onClick={onOpen}
          >
            <EditOutlined />
            Chỉnh sửa trang cá nhân
          </Button>
        </div>
      </div>
      <div className={style["content-box"]}>
        <Row className={style["title-row"]}>
          <Title level={4} className={style.title}>
            Địa chỉ
          </Title>
        </Row>
        <Row className={style["row-content"]}>
          <Text className={style["text-title"]}>Tỉnh / Thành phố:</Text>
          <Text className={style["text-content"]}>
            {user.province || "Chưa điền thông tin"}
          </Text>
        </Row>

        <Row className={style["row-content"]}>
          <Text className={style["text-title"]}>Quận / Huyện:</Text>
          <Text className={style["text-content"]}>
            {user.province || "Chưa điền thông tin"}
          </Text>
        </Row>
        <Row className={style["row-content"]}>
          <Text className={style["text-title"]}>Xã / Phường:</Text>
          <Text className={style["text-content"]}>
            {user.province || "Chưa điền thông tin"}
          </Text>
        </Row>
        <Row className={style["row-content"]}>
          <Text className={style["text-title"]}>Đường:</Text>
          <Text className={style["text-content"]}>
            {user.street || "Chưa điền thông tin"}
          </Text>
        </Row>
      </div>
      <div className={style["content-box"]}>
        <Row className={style["title-row"]}>
          <Title level={4} className={style.title}>
            Thông tin khác
          </Title>
        </Row>
        <Row className={style["row-content"]}>
          <Text className={style["text-title"]}>Số diện thoại:</Text>
          <Text className={style["text-content"]}>
            {user.phoneNumber || "Chưa điền thông tin"}
          </Text>
        </Row>

        <Row className={style["row-content"]}>
          <Text className={style["text-title"]}>Ngày sinh:</Text>
          <Text className={style["text-content"]}>
            {user.birthday?.toDateString() || "Chưa điền thông tin"}
          </Text>
        </Row>
      </div>
      <DrawerUpdateInformation open={open} onClose={onClose}/>
    </div>
  );
}

export default ProfileSection;
