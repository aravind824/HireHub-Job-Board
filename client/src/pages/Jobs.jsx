import { useEffect, useState } from "react";
import { getAllJobs } from "../services/jobService";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";


export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const res = await getAllJobs({
        keyword,
        location,
        company,
      });

      setJobs(res.data.jobs);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Available Jobs
        </h1>

        <LogoutButton />
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">

        <input
          placeholder="Search title..."
          className="border p-2 rounded"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <input
          placeholder="Location"
          className="border p-2 rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          placeholder="Company"
          className="border p-2 rounded"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

      </div>

      <button
        onClick={loadJobs}
        className="bg-blue-600 text-white px-5 py-2 rounded mb-8"
      >
        Search
      </button>

      <div className="grid md:grid-cols-2 gap-6">

        {jobs.map((job) => (

          <div
            key={job._id}
               onClick={() => navigate(`/jobs/${job._id}`)}
                className="shadow-lg rounded-xl p-6 border cursor-pointer hover:shadow-xl transition"
            >

            <h2 className="text-2xl font-bold">
              {job.title}
            </h2>

            <p>{job.company}</p>

            <p>{job.location}</p>

            <p className="font-semibold text-blue-600">
              ₹{job.salary}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}