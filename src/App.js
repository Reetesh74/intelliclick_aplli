import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PaymentDetails from "./components/PaymentDetails";
import PaymentStatus from "./components/PaymentStatus";
import StudentEnrollment from "./pages/StudentEnrollment";
import CreatePayment from "./pages/CreatePayment";
import PaymentTable from "./pages/PaymentTable";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details-payment" element={<PaymentDetails />} />
        <Route path="/payment-status" element={<PaymentStatus />} />
        <Route path="/student-enrollemnt" element={<StudentEnrollment />} />
        <Route path="/create-payment" element={<CreatePayment />} />
        <Route path="/payment-details" element={<PaymentTable />} />
      </Routes>
    </Router>
  );
}

export default App;