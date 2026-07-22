import { useEffect, useState } from "react";
import { getAllJobs } from "../services/jobService";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    setLoading(true);

    try {
      const res = await getAllJobs({
        keyword,
        location,
        company,
      });

      setJobs(res.data.jobs);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <h1 className="text-3xl font-bold mb-6">
          Available Jobs
        </h1>

        {/* Search Filters */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

          <input
            type="text"
            placeholder="Search title..."
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <input
            type="text"
            placeholder="Location"
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            type="text"
            placeholder="Company"
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

        </div>

        <button
          onClick={loadJobs}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg mb-8 transition"
        >
          Search
        </button>

        {/* Job Cards */}

        {jobs.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No jobs found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {jobs.map((job) => (

              <div
                key={job._id}
                onClick={() => navigate(`/jobs/${job._id}`)}
                className="cursor-pointer border rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300"
              >

                <h2 className="text-2xl font-bold mb-2">
                  {job.title}
                </h2>

                <p className="text-gray-700">
                  {job.company}
                </p>

                <p className="text-gray-600">
                  {job.location}
                </p>

                <p className="text-blue-600 font-bold mt-2">
                  ₹{job.salary}
                </p>

              </div>

            ))}

          </div>
        )}

      </div>

      <Footer />
    </>
  );
}