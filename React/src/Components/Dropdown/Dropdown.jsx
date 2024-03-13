import React, { useEffect, useState } from "react";
import { Select } from "antd";
import axios from "axios";

const Dropdown = ({ setValue, text, addValue, setTitle }) => {
  const [category, SetCategory] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/user/getcategory`);
      console.log("jdfsvkjsbf");
      console.log(res.data.category);
      // SetCategory(res.data.categoryname);
    } catch (error) {
      console.log(error);
    }
  };

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
    setTitle(value);
    fetchData();

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

  useEffect(() => {
    fetchData();
    console.log("hii");
  });

  return (
    <div>
      <Select
        defaultValue={"Category"}
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
