// import axios from "axios";

// const API_URL = process.env.REACT_APP_API_URL;

// const DEV_TOKEN = process.env.REACT_APP_DEV_TOKEN;
// const apiClient = axios.create({
//   baseURL: API_URL,
//   headers: {
//     Authorization: `Bearer ${DEV_TOKEN}`,
//   },
// });

// export { apiClient };

// src/services/apiClient.js

import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const DEV_TOKEN = process.env.REACT_APP_DEV_TOKEN;

const apiClient = axios.create({
  baseURL: API_URL,
});

// Gắn token mỗi lần gửi request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || DEV_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

export { apiClient };
