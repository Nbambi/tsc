import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_API;
// import.meta.env.VITE_AUTH_API;

interface ICustomAxiosRequestConfig extends AxiosRequestConfig {
  isAuth?: boolean;
  on401?: () => void;
}

class Request {
  instance: AxiosInstance;

  constructor(config: ICustomAxiosRequestConfig) {
    // this.instance = axios.create(config);
    this.instance = axios.create({
      ...config,
      baseURL: "",
    });

    // 全局请求拦截器
    this.instance.interceptors.request.use(
      (req: InternalAxiosRequestConfig) => {
        req.headers["Content-Type"] = "application/json";
        // const token = getToken();
        // if (token) {
        //   req.headers.Authorization = `Bearer ${token}`;
        // }
        return req;
      },
      (err: any) => {
        return Promise.reject(err);
      }
    );

    // 全局响应拦截器
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        const { status, data } = res;
        if (status === 200) {
          return Promise.resolve(data);
        } else {
          data?.msg && alert(data.msg); // TODO 暂时先浏览器弹框提示
          return Promise.reject(data);
        }
      },
      (err: any) => {
        const { response, message } = err;
        switch (response?.status) {
          case 401:
            // clearToken();
            if (config?.on401 && typeof config.on401 === "function") {
              return config.on401();
            } else {
              // 默认跳转至首页
              // return (window.location.href = "/");
              return alert(message);
            }
          default:
            message && alert(message); // TODO 暂时先浏览器弹框提示
            return Promise.reject(err);
        }
      }
    );
  }

  request(config: AxiosRequestConfig) {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }
}

const request = (config: ICustomAxiosRequestConfig) => {
  return new Promise((resolve, reject) => {
    new Request({
      ...config,
      timeout: 1000 * 60 * 5,
    })
      .request(config)
      .then((res: any) => {
        resolve(res);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};

export default request;
