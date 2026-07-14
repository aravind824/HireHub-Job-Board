import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Profile from "./pages/Profile";
import EmployerDashboard from "./pages/EmployerDashboard";
import NotFound from "./pages/NotFound";
import Applicants from "./pages/Applicants";
import PostJob from "./pages/PostJob";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/jobs" element={<Jobs />} />

        <Route path="/jobs/:id" element={<JobDetails />} />

        <Route path="/profile" element={<Profile />} />

        <Route
          path="/employer/dashboard"
          element={<EmployerDashboard />}
        />

        <Route path="/employer/post-job" element={<PostJob />} />

        <Route
          path="/employer/applicants/:jobId"
          element={<Applicants />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;