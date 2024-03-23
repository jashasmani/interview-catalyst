import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./editorstyles.css";

const QuestionEditorText = ({ placeholder, setValueState }) => {
  const [value, setValue] = useState("");

  // const handleTextChange = (content) => {
  //   setValueState(content);
  //   setValue(content);
  // };

  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],

    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],

    ["clean"],
  ];

  const module = {
    toolbar: toolbarOptions,
  };

  return (
    <ReactQuill
      modules={module}
      theme="snow"
      value={value}
      onChange={setValue}
      style={{ height: "18rem" }}
      placeholder={placeholder || "Type here..."}
    />
  );
};

export default QuestionEditorText;
