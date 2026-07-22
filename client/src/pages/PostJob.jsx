import { useState } from "react";
import { createJob } from "../services/jobService";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PostJob() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    jobType: "Full-Time",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createJob(formData);

      alert(res.data.message || "Job Posted Successfully");

      navigate("/employer/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to post job");
    }
  };

  return (
    <>
    <Navbar />

    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Post New Job</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="title"
          placeholder="Job Title"
          className="border w-full p-2"
          onChange={handleChange}
        />

        <input
          name="company"
          placeholder="Company"
          className="border w-full p-2"
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Location"
          className="border w-full p-2"
          onChange={handleChange}
        />

        <input
          name="salary"
          placeholder="Salary"
          className="border w-full p-2"
          onChange={handleChange}
        />

        <select
          name="jobType"
          className="border w-full p-2"
          onChange={handleChange}
        >
          <option>Full-Time</option>
          <option>Part-Time</option>
          <option>Internship</option>
          <option>Remote</option>
        </select>

        <textarea
          name="description"
          placeholder="Description"
          rows="5"
          className="border w-full p-2"
          onChange={handleChange}
        />

        <button className="bg-blue-600 text-white px-6 py-2 rounded">
          Post Job
        </button>

      </form>
    </div>
    <Footer />
    </>
  );
}