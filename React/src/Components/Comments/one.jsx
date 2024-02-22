import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
  partitionAvatarGroupItems,
} from "@fluentui/react-components";
import { render } from "@testing-library/react";
import { Tooltip } from "antd";
import axios from "axios";
import { React, useEffect, useState } from "react";

const Default = ({ cid }) => {
  const [names, setNames] = useState([]);

  useEffect(() => {
    console.log("jashad", cid);
    const fetchAnswer = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/admin/geteditedanswerbyid?comment_id=${cid}`
        );

        const data1 = res.data.editcomment_data;
        const cusernames = data1.map((item) => item.cusername);
        console.log("data", data1);
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
    ]; // Define your list of colors here
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

export default Default;

// import {
//   AvatarGroup,
//   AvatarGroupItem,
//   AvatarGroupPopover,
//   partitionAvatarGroupItems,
// } from "@fluentui/react-components";
// import { Tooltip } from "antd";
// import axios from "axios";
// import { React, useEffect, useState } from "react";

// const Default = ({ cid }) => {
//   // const names1 = [
//   //   "Johnie McConnell",
//   //   "Allan Munger",
//   //   "Erik Nason",
//     // "Kristin Patterson",
//     // "Daisy Phillips",
//     // "Carole Poland",
//     // "Carlos Slattery",
//     // "Robert Tolbert",
//     // "Kevin Sturgis",
//     // "Charlotte Waltson",
//     // "Elliot Woodward",
//   // ];

//   const [names, setNames] = useState([]);
//   useEffect(() => {
//     console.log("jashad", cid);
//     const fetchAnswer = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/admin/geteditedanswerbyid?comment_id=${cid}`
//         );

//         const data1 = res.data.editcomment_data;
//         const cusernames = data1.map((item) => item.cusername);
//         console.log("data", data1);
//         setNames(cusernames);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchAnswer();
//   }, [cid]);

//   const { inlineItems, overflowItems } = partitionAvatarGroupItems({
//     items: names,
//   });

//   return (
//     <AvatarGroup {...cid}>
//       {inlineItems.map((name) => (
//         <Tooltip title={name} style={{ backgroundColor: "white" }}>
//           <AvatarGroupItem
//             name={name}
//             key={name}
//             style={{ marginLeft: "-6px" }}
//           />
//         </Tooltip>
//       ))}

//       <div className="left-div" style={{ marginLeft: "-6px" }}>
//         {overflowItems && (
//           <AvatarGroupPopover style={{ marginTop: "2rem" }}>
//             {overflowItems.map((name) => (
//               <AvatarGroupItem name={name} key={name} />
//             ))}
//           </AvatarGroupPopover>
//         )}
//       </div>
//     </AvatarGroup>
//   );
// };

// export default Default;
