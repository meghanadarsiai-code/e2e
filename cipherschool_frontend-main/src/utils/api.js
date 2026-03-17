import axios from "axios";
import { API_BASE_URL } from "../config";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 20000,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiClient = api;

export const apiService = {
  auth: {
    userLogin: (payload) => api.post("/user/login", payload),
    userSignup: (payload) => api.post("/user/signup", payload),
    adminLogin: (payload) => api.post("/admin/login", payload),
  },
  users: {
    all: () => api.get("/user/users"),
    search: (key) => api.get(`/user/search/${encodeURIComponent(key)}`),
    updateData: (id) => api.get(`/user/updatedata/${id}`),
    update: (id, payload) => api.put(`/user/updatedata/${id}`, payload),
    single: (id) => api.get(`/user/singleuser/${id}`),
    followers: (id) => api.get(`/user/followers/${id}`),
    following: (id) => api.get(`/user/following/${id}`),
    logActivity: () => api.post("/user/activity"),
  },
  courses: {
    list: () => api.get("/course/courses"),
    enroll: (id) => api.post(`/course/courses/${id}/enroll`),
    myCourses: () => api.get("/course/my-courses"),
    create: (payload) => api.post("/course/courses", payload),
    update: (id, payload) => api.put(`/course/courses/${id}`, payload),
    remove: (id) => api.delete(`/course/courses/${id}`),
  },
  tests: {
    list: () => api.get("/test/tests"),
    submit: (id, payload) => api.post(`/test/tests/${id}/submit`, payload),
    create: (payload) => api.post("/test/tests", payload),
    update: (id, payload) => api.put(`/test/tests/${id}`, payload),
    remove: (id) => api.delete(`/test/tests/${id}`),
  },
  assignments: {
    list: () => api.get("/assignment/assignments"),
    create: (payload) => api.post("/assignment/assignments", payload),
    update: (id, payload) => api.put(`/assignment/assignments/${id}`, payload),
    remove: (id) => api.delete(`/assignment/assignments/${id}`),
  },
  chat: {
    history: () => api.get("/chat/chat/history"),
    send: (payload) => api.post("/chat/chat/message", payload),
    clear: () => api.delete("/chat/chat/clear"),
  },
  certificates: {
    list: () => api.get("/certificate/my-certificates"),
    issue: (userId, payload) => api.post(`/certificate/issue/${userId}`, payload),
  },
};
