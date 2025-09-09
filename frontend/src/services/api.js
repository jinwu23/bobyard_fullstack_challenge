import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const commentAPI = {
  getComments: () => api.get("/comments/"),
  createComment: (data) => api.post("/comments/", data),
  updateComment: (id, data) => api.put(`/comments/${id}/`, data),
  deleteComment: (id) => api.delete(`/comments/${id}/`),
};
