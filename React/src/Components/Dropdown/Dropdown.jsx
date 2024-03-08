import React, { useEffect, useState } from "react";
import { Select } from "antd";

const Dropdown = ({ setValue, text, addValue ,setTitle}) => {
  const [options, setOptions] = useState([
    {
    //   indexedDB: "1",
      value: "Add",
      label: "Add",
      style: { color: "green" },
    },
    {
      value: "Java",
      label: "Java",
    },
    {
      value: "Python",
      label: "Python",
    },
    {
      value: "C++",
      label: "C++",
    },
  ]);

  const handleClick = (value, option) => {
    console.log(`Clicked ${option.label}, value: ${value}`);
    setTitle(value)
    setValue(false);
    if (value === "Add") {
      setValue(true);
    }
  };

  useEffect(() => {
    if (addValue && text) {
      const newOption = {
        value: text,
        label: text,
      };

      setValue(false);
      setOptions((prevOptions) => [...prevOptions, newOption]);
    }
  }, [addValue, text, setValue]);

  return (
    <div>
      <Select
        defaultValue={options[1].value}
        style={{
          width: 120,
        }}
        options={options}
        onChange={handleClick}
      />
    </div>
  );
};

export default Dropdown;
