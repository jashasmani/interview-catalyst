import React from "react";
import { Dropdown } from "antd";
import { Link } from "react-router-dom";
import Person2Icon from "@mui/icons-material/Person2";
import ProfileAvtar from "./ProfileAvtar";
import './ITEM1.css'

const ProfileDropDown = ({ cusename }) => {
  const items = [
    {
      key: "1",
      label: <ProfileAvtar cusename={cusename} />,
    },
    {
        type: 'divider',
      },
    {
      key: "2",
      label: (
        <Link
          to="/profile"
          style={{ display: "flex", justifyContent: "center" }}
        >
          Profile
        </Link>
      ),
    },
    {
        type: 'divider',
      },
    {
      key: "3",
      label: (
        <Link to="/" style={{ display: "flex", justifyContent: "center" }}>
          Log Out
        </Link>
      ),
    },
  ];
  return (
    <>
      <Dropdown
        menu={{
          items,
        }}
        placement="bottom"
        overlayStyle={{ width: "10rem" }}
        className="dropdown-menu-item"
        arrow={{
          pointAtCenter: true,
        }}
        trigger={['click']}
      >
        <Person2Icon style={{ fontSize: "2rem" }} />
      </Dropdown>
    </>
  );
};
export default ProfileDropDown;
