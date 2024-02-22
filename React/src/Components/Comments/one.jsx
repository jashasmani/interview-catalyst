import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
  partitionAvatarGroupItems,
} from "@fluentui/react-components";
import { Tooltip } from "antd";
import axios from "axios";
import { React, useEffect, useState } from "react";


const Default = ({ cid }) => {
  const names1 = [
    "Johnie McConnell",
    "Allan Munger",
    "Erik Nason",
    "Kristin Patterson",
    "Daisy Phillips",
    "Carole Poland",
    "Carlos Slattery",
    "Robert Tolbert",
    "Kevin Sturgis",
    "Charlotte Waltson",
    "Elliot Woodward",
  ];
  const [names, setNames] = useState(names1);

  useEffect(() => {
    console.log("jashad", cid);
    const fetchAnswer = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/admin/geteditedanswerbyid?comment_id=${cid}`
        );

        const data1 = res.data.editcomment_data;
        console.log("data", data1);
        setNames([data1.cusername]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAnswer();
  }, [cid]);

  const { inlineItems, overflowItems } = partitionAvatarGroupItems({
    items: names,
  });

  return (
    <AvatarGroup {...cid}>
      {inlineItems.map((name) => (
        <Tooltip title={name} style={{ backgroundColor: 'white' }}>
          <AvatarGroupItem
            name={name}
            key={name}
            style={{ marginLeft: "-6px" }}
          />
        </Tooltip>
      ))}

      <div className="left-div" style={{ marginLeft: "-6px" }}>
        {overflowItems && (
          <AvatarGroupPopover style={{ marginTop: "2rem" }}>
            {overflowItems.map((name) => (
              <AvatarGroupItem name={name} key={name} />
            ))}
          </AvatarGroupPopover>
        )}
      </div>
    </AvatarGroup>
  );
};

export default Default;
