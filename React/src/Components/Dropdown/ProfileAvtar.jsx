import React from "react";
import { Avatar, Tooltip } from "antd";

import getUsernameColor from "../../Components/Functions/Avtar";

const ProfileAvtar = ({ cusename }) => {
  const backgroundColor = getUsernameColor(cusename);

  return (
    <div
      style={{
        height: "8rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Tooltip placement="bottom" title={cusename}>
        <Avatar
          size={48}
          style={{
            backgroundColor: backgroundColor,
            color: "#ffffff",
            fontSize: "1.3rem",
          }}
        >
          {cusename.charAt(0).toUpperCase()}
        </Avatar>
      </Tooltip>
      
    </div>
  );
};

export default ProfileAvtar;
