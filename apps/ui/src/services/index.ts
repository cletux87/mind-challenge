import axios, {
  Axios,
  AxiosError,
  AxiosPromise,
  AxiosResponse,
  CancelTokenSource,
} from 'axios';
import { JWT_LOCAL_STORAGE_KEY } from '../constants/auth';
import { END_POINT_BASE_ROUTE } from '../constants/url';

export const NETLIFY_API_PREFIX = '.netlify/functions';

export const client = axios.create({
  baseURL: `${END_POINT_BASE_ROUTE}`,
  // withCredentials: true,
});

client.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
    if (token && config && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  async (error: AxiosError): Promise<AxiosError> => {
    if (error.response?.status === 401) {
      console.log('REQUEST --- INVALID');
    }
    return Promise.reject(error);
  }
);

export const request = async <T>({
  method,
  url,
  cancelToken,
}: {
  method: keyof Axios;
  url: string;
  cancelToken?: CancelTokenSource;
}): AxiosPromise<T> => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      // console.log(user?.user);
      // TODO Fix this TS annotation
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const response: AxiosResponse<T> = await client[String(`${method}`)]<
        AxiosResponse<T>
      >(url, { ...(cancelToken ? cancelToken : undefined) });
      if (response.status === 200) {
        resolve(response);
      }
      reject({ error: 'No know Error', status: response.status });
    } catch (error) {
      reject({ error, status: 500 });
    }
  });
};
