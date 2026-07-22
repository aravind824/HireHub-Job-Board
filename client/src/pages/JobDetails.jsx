import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobById, applyJob } from "../services/jobService";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";

export default function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    loadJob();
  }, []);

  const loadJob = async () => {
    try {
      const res = await getJobById(id);
      setJob(res.data.job);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };



  const handleApply = async () => {
    setApplying(true);

    try {
      const res = await applyJob(job._id);
      alert(res.data.message || "Application submitted successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to apply");
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!job) {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold text-center">
          Job not found.
        </h2>
      </div>
      <Footer />
    </>
  );
}

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold">{job.title}</h1>

        <h2 className="text-xl mt-3">{job.company}</h2>

        <p>{job.location}</p>

        <p className="mt-4">{job.description}</p>

        <p className="mt-4">Salary : ₹{job.salary}</p>

        <button
          onClick={handleApply}
          disabled={applying}
          className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-6 py-2 rounded mt-6"
        >
          {applying ? "Applying..." : "Apply Now"}
        </button>

        <p className="mt-4">Type : {job.jobType}</p>
      </div>

      <Footer />
    </>
  );
}