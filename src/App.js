import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PaymentDetails from "./pages/PaymentDetails";
import PaymentStatus from "./components/PaymentStatus";
import StudentEnrollment from "./pages/StudentEnrollment";
import CreatePayment from "./pages/CreatePayment";
import PaymentTable from "./pages/PaymentTable";
import HomePage from "./pages/HomePage";
import DraftDetails from "./pages/DraftDetails";
//admin
import CreateCourse from "./pages/Admin/CreateCoursePage";
// coupon
import CouponPage from "./pages/coupon/couponPage";
import CouponDetail from "./pages/coupon/couponDetail";

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
        <Route path="/draft-details" element={<DraftDetails />} />
        {/* admin routes */}
        <Route path="/create-course" element={<CreateCourse />} />
        <Route path="/create-coupon" element={<CouponPage />} />
        <Route path="/details-coupon" element={<CouponDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
