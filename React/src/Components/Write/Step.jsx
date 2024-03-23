import React, { useEffect, useState } from "react";
import { Button, message, theme } from "antd";
import CustomModal from "./CustomModal";
import Dropdown from "../Dropdown/Dropdown";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const StepsDesign = ({
  closeModal,
  username,
  setShowAlert1,
  setShowAlertCategory,
}) => {
  const [current, setCurrent] = useState(0);
  const [value, setValue] = useState(false);
  const [addValue, setAddValue] = useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [done, setDone] = useState("");

  const steps = [
    {
      title: "Question",
      content: (
        <CustomModal
          closeModal={closeModal}
          username={username}
          setShowAlert1={setShowAlert1}
          setShowAlertCategory={setShowAlertCategory}
          current={current}
        />
      ),
    },
    {
      title: "Answer",
      content: (
        <CustomModal
          closeModal={closeModal}
          username={username}
          setShowAlert1={setShowAlert1}
          setShowAlertCategory={setShowAlertCategory}
          current={current}
          done={done}
        />
      ),
    },
  ];

  useEffect(() => {
    <CustomModal done={done} />;
  }, [done]);

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    textAlign: "center",
    marginTop: 16,
    marginBottom: "5rem",
  };
  return (
    <>
      <div className="question-title">
        <h2>{current === 0 ? "Add Your Question" : "Write Answer"}</h2>
      </div>
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="combo">
                <Dropdown
                  setValue={setValue}
                  text={text}
                  addValue={addValue}
                  setTitle={setTitle}
                />
                {value && (
                  <div className="input-button">
                    <input
                      type="text"
                      className="bottom-input"
                      placeholder="Add Subject"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                    <div onClick={() => setAddValue(true)} className="add-item">
                      <AddCircleIcon style={{ fontSize: "2rem" }} />
                    </div>
                  </div>
                )}
              </div>
              <div>
                <Button type="primary" onClick={() => next()}>
                  Next
                </Button>
                <Button
                  style={{
                    margin: "0 8px",
                  }}
                  onClick={() => next()}
                >
                  Close
                </Button>
              </div>
            </div>
          </>
        )}
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => {
                // message.success("Processing complete!");
                setDone("done");
              }}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button
              style={{
                margin: "0 8px",
              }}
              onClick={() => prev()}
            >
              Previous
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
export default StepsDesign;
