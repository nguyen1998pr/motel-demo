import axiosMotel from "../../../utils/axiosMotel";

export const userRegister = (data) => {
  return axiosMotel.post(`user/register`, data);
};

export const userLogin = (data) => {
  return axiosMotel.post(`user/login`, data);
};

export const userInfo = () => {
  return axiosMotel.get(`user/settings`, "", {
    headers: { Authorization: localStorage.getItem("token") },
  });
};
