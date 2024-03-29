import React, { useEffect, useState } from "react";
import "../../CSS/Admin_Main.css";
import AdminCheackAns from "../Admin-Cheack-Ans/Admin_Cheack_Ans";
import "../../../CSS/Write.css";
import axios from "axios";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

function AdminCheackMain() {
  const [findEditedAnswerData, setFindEditedAnswerData] = useState([]);
  const [refereshData, setRefereshData] = useState(true);
  const nav = useNavigate();
  useEffect(() => {
    const fetchAnswer = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/admin/findEditedAnswer`
        );
        // console.log(res.data.edit_answer_id);
        setFindEditedAnswerData(res.data.edit_answer_id);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAnswer();
  }, [refereshData, findEditedAnswerData]);

  return (
    <div className="main-main-admin">
      <nav className="top-main-admin">
        <div className="logo-main-admin">
          <h3 className="logo-text">Interview Catalyst</h3>
        </div>

        <div className="admin-name">
          <div onClick={()=>nav('/admin')}>
            Home
          </div>
          <h1 style={{ marginLeft: "1rem" }}>{"ADMIN"}</h1>
        </div>
      </nav>

      <div className="main-part-admin">
        <div style={{ whiteSpace: "pre-line" }}>
          {findEditedAnswerData.length > 0 ? (
            <div>
              {findEditedAnswerData.map((value, index) =>
                value.grant === "none" ? (
                  <AdminCheackAns
                    key={index}
                    data={value}
                    setRefereshData={setRefereshData}
                  />
                ) : (
                  " "
                )
              )}

              <div className="semaple">
                <div className="dot-spinner">
                  <div className="dot-spinner__dot"></div>
                  <div className="dot-spinner__dot"></div>
                  <div className="dot-spinner__dot"></div>
                  <div className="dot-spinner__dot"></div>
                  <div className="dot-spinner__dot"></div>
                  <div className="dot-spinner__dot"></div>
                  <div className="dot-spinner__dot"></div>
                  <div className="dot-spinner__dot"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="not-found">
              <h1>No Results Found... </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminCheackMain;
