import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import "./SearchBar.css";

const Search = ({ setResults }) => {
  const [input, setInput] = useState("");

  const onSearch = async (value) => {
    try {
      if (value) {
        const res = await axios.get(
          `http://localhost:5000/user/searchprofile/${value}`
        );
        const newData = res.data.search_profile;
        // console.log(newData);
        console.log(newData.map((item) => item.name));
        if (newData) {
          setResults(newData.map((item) => item.name));
        }
      } 
      else {
        setResults([]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    onSearch(value);
  };

  return (
    <div className="input-wrapper">
      <SearchIcon className="image-main" />
      <input
        placeholder="Username..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default Search;
