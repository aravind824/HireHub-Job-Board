import api from "./api";

export const getAllJobs = (params) =>
  api.get("/jobs", { params });

export const getJobById = (id) =>
  api.get(`/jobs/${id}`);

export const createJob = (data) =>
  api.post("/jobs", data);

export const applyJob = (jobId) =>
  api.post(
    `/applications/${jobId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );