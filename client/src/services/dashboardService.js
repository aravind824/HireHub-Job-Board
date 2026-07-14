import api from "./api";

export const getEmployerDashboard = () =>
  api.get("/dashboard/employer");

export const getDashboardStats = () =>
  api.get("/dashboard/stats");