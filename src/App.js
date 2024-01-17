import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import HomePage from "./pages/HomePage";
import RecordPage from "./pages/RecordPage";
import UpdateRecord from "./pages/UpdateRecord";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/records" element={<RecordPage />}></Route>
          <Route path="/records/:customerId" element={<RecordPage />}></Route>
          <Route
            path="/records/:startDate/:endDate"
            element={<RecordPage />}
          ></Route>
          <Route
            path="/records/edit/:customerId"
            element={<UpdateRecord />}
          ></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
