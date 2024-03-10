 import { Link } from "react-router-dom";
 import React from "react";
 import { DownOutlined } from "@ant-design/icons";
 import Avatar  from "@ant-design/icons";
 import { Dropdown, Space } from "antd";
import "./Dropdown.css";
 import SideAvtar from "../SideAvtar/SideAvtar";

 const items = [
   {
     label: <SideAvtar />,
     key: "1",
   },
   {
     type: "divider",
   },
   {
     label: <SideAvtar />,
     key: "1",
   },
   {
     type: "divider",
   },
   {
     label: <SideAvtar />,
     key: "3",
   },
 ];

 const DropdownComment = () => (
   <Dropdown
     menu={{
       items,
     }}
     className="menu-dropdown"
     trigger={["click"]}
   >
     <Link onClick={(e) => e.preventDefault()}>
       <Space>
         <DownOutlined />
       </Space>
     </Link>
   </Dropdown>
 );
 export default DropdownComment;
