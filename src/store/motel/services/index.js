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

export const addApartment = (data) => {
  return axiosMotel.post(`property/add`, data, {
    headers: { Authorization: localStorage.getItem("token") },
  });
};

export const apartmentEdit = (id) => {
  return axiosMotel.get(`property/edit/${id}`, "", {
    headers: { Authorization: localStorage.getItem("token") },
  });
};

export const apartmentInfo = (id) => {
  return axiosMotel.get(`property/view/${id}`, "", {});
};

export const editApartment = (id, data) => {
  return axiosMotel.patch(`property/edit/${id}`, data, {
    headers: { Authorization: localStorage.getItem("token") },
  });
};

export const editPanoImage = (id, data) => {
  return axiosMotel.patch(`property/edit/${id}/panorama`, data, {
    headers: { Authorization: localStorage.getItem("token") },
  });
};

export const allApartment = () => {
  return axiosMotel.get(`property/all`, "", {});
};

export const userApartment = () => {
  return axiosMotel.get(`user/property`, "", {
    headers: { Authorization: localStorage.getItem("token") },
  });
};
