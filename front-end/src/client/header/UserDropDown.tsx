import { Button, Dropdown, MenuProps } from "antd";
import React from "react";
import { FaUserAlt } from "react-icons/fa";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        Đăng nhập
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        Đăng ký
      </a>
    ),
  },
];

const UserDropDown = () => {
  return (
    <Dropdown menu={{ items }} placement="topRight" className="hidden lg:block">
      <Button title="icon">
        <FaUserAlt />
      </Button>
    </Dropdown>
  );
};

export default UserDropDown;
