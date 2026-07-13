import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobById } from "../services/jobService";
import { applyJob } from "../services/jobService";

export default function JobDetails() {

  const { id } = useParams();

  const [job, setJob] = useState(null);

  useEffect(() => {
    loadJob();
  }, []);


  const loadJob = async () => {
    const res = await getJobById(id);
    setJob(res.data.job);
  };

  const handleApply = async () => {
  try {
    const res = await applyJob(job._id);

    alert(res.data.message || "Application submitted successfully!");
  } catch (err) {
    alert(
      err.response?.data?.message || "Failed to apply"
    );
  }
};

  if (!job) return <h2>Loading...</h2>;

  return (
    <div className="max-w-4xl mx-auto p-8">

      <h1 className="text-4xl font-bold">
        {job.title}
      </h1>

      <h2 className="text-xl mt-3">
        {job.company}
      </h2>

      <p>{job.location}</p>

      <p className="mt-4">
        {job.description}
      </p>

      <p className="mt-4">
        Salary : ₹{job.salary}
      </p>

      <button 
        onClick={handleApply}
           className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded mt-6"
        >
        Apply Now
        </button>

      <p className="mt-4">
        Type : {job.jobType}
      </p>

    </div>
  );
}