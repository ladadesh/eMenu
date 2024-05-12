import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Emenu from "./components/Emenu";
import StoreLogin from "./components/StoreLogin";
import ApplyStore from "./components/ApplyStore";
import QRCode from "./components/QRCode";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route path="/" exact={true} Component={Home} />
          <Route path="/qr" Component={QRCode} />
          <Route path="/list" Component={Emenu} />
          <Route path="/login" Component={StoreLogin} />
          <Route path="/apply" Component={ApplyStore} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
