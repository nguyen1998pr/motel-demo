import axios from "axios";
import { isEmpty, assign } from "lodash";
const singletonEnforcer = Symbol();

class AxiosClient {
  axiosMotel;
  static axiosMotelInstance;

  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error("Cannot initialize Axios client single instance");
    }

    this.axiosMotel = axios.create({
      baseURL: "http://localhost:8080/",
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.axiosMotel.interceptors.request.use(
      (configure) => configure,
      (error) => Promise.reject(error)
    );

    this.axiosMotel.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error.response);
      }
    );
  }

  static get instance() {
    if (!this.axiosMotelInstance) {
      this.axiosMotelInstance = new AxiosClient(singletonEnforcer);
    }
    return this.axiosMotelInstance;
  }

  get(resource, slug = "", config = {}) {
    const requestURL = isEmpty(slug) ? `${resource}` : `${resource}/${slug}`;
    return this.axiosMotel.get(
      requestURL,
      assign(config, this.axiosMotel.defaults.headers)
    );
  }

  post(resource, data, config = {}) {
    return this.axiosMotel.post(
      `${resource}`,
      data,
      assign(config, this.axiosMotel.defaults.headers)
    );
  }

  update(resource, data, config = {}) {
    return this.axiosMotel.put(
      `${resource}`,
      data,
      assign(config, this.axiosMotel.defaults.headers)
    );
  }

  put(resource, data, config = {}) {
    return this.axiosMotel.put(
      `${resource}`,
      data,
      assign(config, this.axiosMotel.defaults.headers)
    );
  }

  patch(resource, data, config = {}) {
    return this.axiosMotel.patch(
      `${resource}`,
      data,
      assign(config, this.axiosMotel.defaults.headers)
    );
  }

  delete(resource, data, config = {}) {
    return this.axiosMotel.delete(`${resource}`, {
      ...assign(config, this.axiosMotel.defaults.headers),
      params: data,
    });
  }
}

export default AxiosClient.instance;
