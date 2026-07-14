import api from "./api";

// Employer - View Applicants
export const getApplicants = (jobId) =>
  api.get(`/applications/applicants/${jobId}`);

// Employer - Update Status
export const updateStatus = (applicationId, status) =>
  api.put(`/applications/status/${applicationId}`, {
    status,
  });

// Job Seeker - My Applications
export const getMyApplications = () =>
  api.get("/applications/my");