import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminMain from "./Components/Admin/JSX/Admin-Main/Admin_Main";
import AdminCheackAns from "./Components/Admin/JSX/Admin-Cheack-Ans/Admin_Cheack_Ans";
// import AdminCheackMain from "./Components/Admin/JSX/Admin-Cheack-Ans/Admin_Cheack_main";
import Signin from './Components/Signin/JSX/Signin'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/admin" element={<AdminMain />} />
        <Route path="/admin_cheack_ans" element={<AdminCheackAns />} />
        {/* <Route path="/admin_cheack_main" element={<AdminCheackMain />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
