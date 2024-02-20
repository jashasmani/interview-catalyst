import { AvatarGroup, AvatarGroupItem, AvatarGroupPopover, partitionAvatarGroupItems } from "@fluentui/react-components";
import * as React from "react";
// import * as ReactDOM from 'react-dom';
// import { FluentProvider, webLightTheme } from '@fluentui/react-components';
// import { deflateSync } from 'zlib';

const names = [
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

const Default = (props) => {
  const { inlineItems, overflowItems } = partitionAvatarGroupItems({
    items: names,
  });

  return (
    <AvatarGroup {...props}>
      {inlineItems.map((name) => (
        <AvatarGroupItem name={name} key={name} />
      ))}

      {overflowItems && (
        <AvatarGroupPopover>
          {overflowItems.map((name) => (
            <AvatarGroupItem name={name} key={name} />
          ))}
        </AvatarGroupPopover>
      )}
    </AvatarGroup>
  );
};

export default Default;

// ReactDOM.render(
//   <FluentProvider theme={webLightTheme}>
//     <Default />
//   </FluentProvider>,
//   document.getElementById('root')
// );
