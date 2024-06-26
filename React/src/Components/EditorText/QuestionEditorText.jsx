import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./editorstyles.css";
import { useSelector } from "react-redux";

const QuestionEditorText = ({ placeholder, setQuestion }) => {
  const dataQuestion = useSelector((state) => state.dataQuestion);
  const [value, setValue] = useState(dataQuestion.question);

  const handleTextChange = (content) => {
    setValue(content);
    setQuestion(content);
  };

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "image"],

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
      onChange={handleTextChange}
      style={{ height: "18rem" }}
      placeholder={placeholder || "Type here..."}
    />
  );
};

export default QuestionEditorText;
