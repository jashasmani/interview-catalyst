import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
  partitionAvatarGroupItems,
} from "@fluentui/react-components";
import { Tooltip } from "antd";
import axios from "axios";
import { React, useEffect, useState } from "react";

const Contribution = ({ cid }) => {
  const [names, setNames] = useState([]);

  useEffect(() => {
    const fetchAnswer = async () => {
      try {
        const res = await axios.get(
          `https://interview-catalyst.onrender.com/admin/geteditedanswerbyid?comment_id=${cid}`
        );

        const data1 = res.data.editcomment_data;
        const cusernames = data1
          .filter(
            (item, index, array) =>
              array.findIndex((obj) => obj.cusername === item.cusername) ===
              index
          )
          .map((item) => item.cusername);
        setNames(cusernames);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAnswer();
  }, [cid]);

  const getColor = (index) => {
    const colors = [
      "#FF5733",
      "#33FFA8",
      "#3381FF",
      "#FF33C9",
      "#FFE833",
      "#33FFDE",
      "#9D33FF",
      "#FF33A8",
      "#33FFA1",
      "#C933FF",
      "#FF5733",
    ];

    return colors[index % colors.length];
  };

  const { inlineItems, overflowItems } = partitionAvatarGroupItems({
    items: names,
  });

  const renderName = (name) => {
    if (name.split(" ").length === 1) {
      return name.toUpperCase().split("").join(" ");
    } else {
      return name;
    }
  };

  return (
    <AvatarGroup {...cid}>
      {inlineItems.map((name, index) => (
        <Tooltip title={name} style={{ backgroundColor: "white" }}>
          <AvatarGroupItem
            name={renderName(name)}
            key={name}
            style={{ marginLeft: "-6px" }}
          />
        </Tooltip>
      ))}

      <div className="left-div" style={{ marginLeft: "-6px" }}>
        {overflowItems && (
          <AvatarGroupPopover style={{ marginTop: "2rem" }}>
            {overflowItems.map((name, index) => (
              <AvatarGroupItem name={renderName(name)} key={name} />
            ))}
          </AvatarGroupPopover>
        )}
      </div>
    </AvatarGroup>
  );
};

export default Contribution;
