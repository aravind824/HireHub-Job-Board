import api from "./api";

// Employer Dashboard (Jobs)
export const getEmployerDashboard = () =>
  api.get("/dashboard/employer");

// Dashboard Statistics
export const getDashboardStats = () =>
  api.get("/dashboard/stats");