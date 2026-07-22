import api from "./api";

export const getProfile = () => api.get("/users/profile");

export const updateProfile = (data) => api.put("/users/profile", data);

export const uploadResume = (formData) =>
  api.put("/users/resume", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  export const uploadProfilePicture = (formData) =>
  api.put("/users/profile-picture", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });