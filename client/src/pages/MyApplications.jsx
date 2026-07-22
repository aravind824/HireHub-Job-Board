import { useEffect, useState } from "react";
import { getMyApplications } from "../services/applicationService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data } = await getMyApplications();
      setApplications(data.applications);
    } catch (err) {
      console.log(err);
    }
  };

  // Status badge colors
  const statusColor = {
    Pending: "#f59e0b",
    Reviewed: "#3b82f6",
    Accepted: "#22c55e",
    Rejected: "#ef4444",
  };

  return (
    <>
    <Navbar />
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        My Applications
      </h1>

      {applications.length === 0 ? (
        <div className="text-center mt-10">
          <h2 className="text-2xl font-semibold">
            You haven't applied for any jobs yet.
          </h2>
        </div>
      ) : (
        <div className="grid gap-6">
          {applications.map((app) => (
            <div
              key={app._id}
              className="border rounded-xl shadow-lg p-6 bg-white"
            >
              <h2 className="text-2xl font-bold text-blue-700">
                {app.job.title}
              </h2>

              <p className="mt-2">
                <b>Company:</b> {app.job.company}
              </p>

              <p>
                <b>Applied On:</b>{" "}
                {new Date(app.createdAt).toLocaleDateString()}
              </p>

              <p className="mt-3">
                <b>Status:</b>{" "}
                <span
                  style={{
                    backgroundColor: statusColor[app.status],
                    color: "white",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  {app.status}
                </span>
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