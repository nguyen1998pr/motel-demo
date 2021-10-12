import axiosMotel from "../../../utils/axiosMotel";

export const userRegister = (data) => {
  return axiosMotel.post(`user/register`, data);
};
