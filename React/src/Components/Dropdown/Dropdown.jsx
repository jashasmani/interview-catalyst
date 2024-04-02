import React, { useEffect, useState } from "react";
import { Select, message } from "antd";
import axios from "axios";

const Dropdown = ({ setValue, text, addValue, setTitle }) => {
  const [options, setOptions] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`https://interview-catalyst.onrender.com/user/getcategory`);
      const fetchedCategories = res.data.category.map(({ value }) => ({
        value,
        label: value,
      }));

      const allOptions = [
        { value: "Add", label: "Add", style: { color: "green" } },
        ...fetchedCategories,
      ];
      setOptions(allOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (value, option) => {
    fetchData();

    setTitle(value);
    setValue(false);
    if (value === "Add") {
      setValue(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (addValue && text) {
      const addCategory = async () => {
        try {
          const res = await axios.post(
            `https://interview-catalyst.onrender.com/user/addcategory`,
            {
              title: text.charAt(0).toUpperCase() + text.slice(1),
            }
          );
          if (res) {
            message.success("Category is add");
          }
          fetchData();
        } catch (error) {
          console.log(error);
        }
      };

      addCategory();

      const newOption = {
        value: text.charAt(0).toUpperCase() + text.slice(1),
        label: text.charAt(0).toUpperCase() + text.slice(1),
      };
      setOptions((prevOptions) => [...prevOptions, newOption]);
      setValue(false);
    }
  }, [addValue, text, setValue]);

  return (
    <div>
      <Select
        defaultValue={"Category"}
        style={{ width: 120 }}
        options={options}
        onChange={handleClick}
      />
    </div>
  );
};

export default Dropdown;
