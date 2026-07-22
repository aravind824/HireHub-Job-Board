import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  getApplicants,
  updateStatus,
} from "../services/applicationService";

export default function Applicants() {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const { data } = await getApplicants(jobId);
      setApplications(data.applications);
    } catch (err) {
      console.log(err);
    }
  };

  const changeStatus = async (id, status) => {
    try {
      await updateStatus(id, status);
      fetchApplicants();
    } catch (err) {
      console.log(err);
    }
  };

  const statusColor = {
  Pending: "orange",
  Reviewed: "blue",
  Accepted: "green",
  Rejected: "red",
};


  return (
    <>
    <Navbar />

    <div style={{ padding: "30px" }}>
      <h1>Applicants</h1>

      {applications.length === 0 ? (
        <p>No applicants yet.</p>
      ) : (
        applications.map((app) => (
          <div
            key={app._id}
            style={{
              border: "1px solid gray",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          >
            <h3>{app.applicant.name}</h3>

            <p>{app.applicant.email}</p>

            <p>
              <b>Cover Letter:</b> {app.coverLetter || "No Cover Letter"}
            </p>

            <p>
              <b>Status:</b>{" "}
              <span
                style={{
                  color: statusColor[app.status],
                  fontWeight: "bold",
                }}
            >
             {app.status}
          </span>
        </p>

            <div style={{ marginTop: "15px" }}>
              <button
                onClick={() => changeStatus(app._id, "Reviewed")}
                style={{
                  marginRight: "10px",
                  padding: "8px 15px",
                  background: "#f59e0b",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Review
              </button>

              <button
                onClick={() => changeStatus(app._id, "Accepted")}
                style={{
                  marginRight: "10px",
                  padding: "8px 15px",
                  background: "#22c55e",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Accept
              </button>

              <button
                onClick={() => changeStatus(app._id, "Rejected")}
                style={{
                  padding: "8px 15px",
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
    <Footer />
    </>
  );
}