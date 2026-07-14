import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  return (
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
            }}
          >
            <h3>{app.applicant.name}</h3>

            <p>{app.applicant.email}</p>

            <p>
              <b>Cover Letter:</b> {app.coverLetter}
            </p>

            <p>
              <b>Status:</b> {app.status}
            </p>

            <button
              onClick={() => changeStatus(app._id, "Reviewed")}
            >
              Review
            </button>

            <button
              onClick={() => changeStatus(app._id, "Accepted")}
            >
              Accept
            </button>

            <button
              onClick={() => changeStatus(app._id, "Rejected")}
            >
              Reject
            </button>
          </div>
        ))
      )}
    </div>
  );
}