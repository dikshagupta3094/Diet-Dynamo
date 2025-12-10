import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import Signup from "./Pages/Signup.jsx";
import About from "./Pages/About";
import Login from "./Pages/Login.jsx";
import EmailVerification from "./Pages/EmailVerification.jsx";
import OurExpert from "./Pages/OurExpert.jsx";
import SubscriptionSuccess from "./Pages/SubscriptionSuccess.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/emailverify" element={<EmailVerification />} />
      <Route path="/login" element={<Login />} />
      <Route path="/expert" element={<OurExpert />} />
      <Route path="/subscription-success" element={<SubscriptionSuccess />} />
    </Routes>
  );
}

export default App;
