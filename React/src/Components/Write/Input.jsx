// import axios from "axios";
// import React, { useState } from "react";
// import ReactMarkdown from 'react-markdown'

// const CustomModal = ({ closeModal, username }) => {
//   const [question, setQuestion] = useState("");
//   const [answers, setAnswers] = useState("");

//   const handleQuestion = (e) => {
//     setQuestion(e.target.value);
//   };
//   const handleAnswers = (e) => {
//     setAnswers(e.target.value);
//   };

//   const callCloseModal = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/user/question", {
//         question,
//         username,
//       });

//       if (response.data.question_main._id !== "" && answers !== "") {
//         try {
//           await axios.post("http://localhost:5000/user/commentsubmit", {
//             cusername: username,
//             commentData: answers,
//             question_id: response.data.question_main._id,
//             edited_comment: "none",
//           });
//         } catch (error) {
//           console.log(error);
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }

//     closeModal();
//   };

//   return (
//     <>
//       <div className="modal-wrapper" onClick={closeModal}></div>

//       <div className="modal-container">
//         <div>{username}</div>
//         <div className="title-write">
//           <label>Create Post</label>
//         </div>
//         <div className="inputfield">

//           <textarea
//             type="text"
//             rows="3"
//             name="question"
//             value={question}
//             onChange={handleQuestion}
//             placeholder="What's on your mind?"
//             className="question-write"
//             required
//           />

//           <textarea
//             type="text"
//             rows="9"
//             name="answer"
//             value={answers}
//             onChange={handleAnswers}
//             placeholder="Compose your answer here..."
//             className="answer-write"
//           />
//         </div>
//         <div className="two-buttons">
//           <button onClick={closeModal} className="btn-write-in-cancel">
//             Cancel
//           </button>

//           <button onClick={callCloseModal} className="btn-write-in">
//             Send
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CustomModal;




import axios from "axios";
import React, { useState } from "react";
import ReactMarkdown from 'react-markdown'

const CustomModal = ({ closeModal, username }) => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState("");

  const handleQuestion = (e) => {
    setQuestion(e.target.value);
  };

  const handleAnswers = (e) => {
    if (!answers) {
      setAnswers('• ' + e.target.value);
    } else {
      setAnswers(e.target.value);
    }
  };

  const callCloseModal = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/user/question", {
        question,
        username,
      });

      if (response.data.question_main._id !== "" && answers !== "") {
        try {
          await axios.post("http://localhost:5000/user/commentsubmit", {
            cusername: username,
            commentData: answers,
            question_id: response.data.question_main._id,
            edited_comment: "none",
          });
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }

    closeModal();
  };

  return (
    <>
      <div className="modal-wrapper" onClick={closeModal}></div>

      <div className="modal-container">
        <div>{username}</div>
        <div className="title-write">
          <label>Create Post</label>
        </div>
        <div className="inputfield">
          <textarea
            type="text"
            rows="3"
            name="question"
            value={question}
            onChange={handleQuestion}
            placeholder="What's on your mind?"
            className="question-write"
            required
          />
          <textarea
            type="text"
            rows="9"
            name="answer"
            value={answers}
            onChange={handleAnswers}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                setAnswers((prevAnswers) => prevAnswers + '\n• ');
              }
            }}
            placeholder="Compose your answer here..."
            className="answer-write"
          />
        </div>
        <div className="two-buttons">
          <button onClick={closeModal} className="btn-write-in-cancel">
            Cancel
          </button>
          <button onClick={callCloseModal} className="btn-write-in">
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default CustomModal;

