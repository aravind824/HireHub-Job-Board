import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  getEmployerDashboard,
  getDashboardStats,
} from "../services/dashboardApi";
import { Link } from "react-router-dom";

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const dashboardRes = await getEmployerDashboard();
      const statsRes = await getDashboardStats();

      setJobs(dashboardRes.data.jobs);
      setStats(statsRes.data.stats);
    } catch (error) {
      console.log(error);
    }
  };

  if (!stats) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
    <Navbar />

    <div style={{ padding: "30px" }}>
      <h1>Employer Dashboard</h1>

        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
  <Link to="/employer/post-job">
    <button
      style={{
        padding: "10px 20px",
        background: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      + Post New Job
    </button>
  </Link>
</div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <Card title="Total Jobs" value={stats.totalJobs} />
        <Card title="Applications" value={stats.totalApplications} />
        <Card title="Pending" value={stats.pending} />
        <Card title="Reviewed" value={stats.reviewed} />
        <Card title="Accepted" value={stats.accepted} />
        <Card title="Rejected" value={stats.rejected} />
      </div>

      <h2 style={{ marginTop: "40px" }}>My Jobs</h2>

      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job.jobId}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginTop: "15px",
              borderRadius: "8px",
            }}
          >
            <h3>{job.title}</h3>

            <p>Company: {job.company}</p>

            <p>Location: {job.location}</p>

            <p>Applications: {job.applications}</p>

            <Link to={`/employer/applicants/${job.jobId}`}>
                <button
                    style={{
                        marginTop: "10px",
                        padding: "8px 15px",
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                }}
            >
                View Applicants
            </button>
        </Link>
          </div>
        ))
      )}
    </div>
    <Footer />
    </>
  );
}

function Card({ title, value }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        textAlign: "center",
        background: "#f8f9fa",
      }}
    >
      <h3>{title}</h3>
      <h1>{value}</h1>
    </div>
  );
}