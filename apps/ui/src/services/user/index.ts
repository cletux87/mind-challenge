import { ActiveDTO, UserRegisterDTO, UserUpdateDTO } from '@mind-challenge4/share-types';
import axios, { AxiosResponse } from 'axios';
import { JWT_LOCAL_STORAGE_KEY } from '../../constants/auth';
import {
  END_POINT_BASE_ROUTE,
  END_POINT_ME,
  END_POINT_SIGN_IN,
} from '../../constants/url';
import { client, request } from '../index';

interface ILoginUser {
  id: number;
  email: string;
  role: string;
}

const hasJWTValidUser = (jwt: ILoginUser): jwt is ILoginUser => {
  if (jwt && jwt.id && jwt.email && jwt.role) {
    return (
      typeof jwt.id === 'number' &&
      typeof jwt.email === 'string' &&
      typeof jwt.role === 'string'
    );
  }
  return false;
};

interface IUserResponse {
  jwt: string;
}

export const authenticate = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return axios.post<IUserResponse>(
    `${END_POINT_BASE_ROUTE}${END_POINT_SIGN_IN}`,
    {
      email,
      password,
    }
  );
};

export interface IGetAllSingleUserResponse {
  createdAt: string;
  id: string;
  isActive: boolean;
  isBlocked: boolean;
  role: string;
}

export const decodeJWT = (jwt: string) => {
  try {
    const base64Url = jwt.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const userStr = window.atob(base64);
    const userObj = JSON.parse(userStr);
    if (hasJWTValidUser(userObj)) {
      return userObj;
    }
  } catch (error) {
    // TODO apply log service
    console.log(error);
    return null;
  }
  return null;
};

export interface IGetAllResponse {
  users: IGetAllSingleUserResponse[];
}

export const getAllUsers = (): Promise<AxiosResponse<IGetAllResponse>> => {
  return request<IGetAllResponse>({ method: 'get', url: '/users/all' });
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const register = (): Promise<AxiosResponse<any>> => {
  return request<any>({ method: 'get', url: '/auth/register' });
};
/* eslint-enable @typescript-eslint/no-explicit-any */

export const whoami = (userId: number): Promise<AxiosResponse<ILoginUser>> => {
  return request<ILoginUser>({
    method: 'get',
    url: `${END_POINT_ME}`,
  });
};

export const updateUser = ({
  userId,
  userUpdates,
}: {
  userId: string;
  userUpdates: UserUpdateDTO;
}) => {
  return client.put<UserUpdateDTO>(`/api/user/${userId}`, {
    ...userUpdates,
  });
};

export const createUser = ({
  userId,
  userCreate,
}: {
  userId: string;
  userCreate: UserRegisterDTO;
}) => {
  return client.post<{ data: UserUpdateDTO & { id: string } }>(
    `/api/user/${userId}`,
    {
      ...userCreate,
    }
  );
};

export const changeActiveUser = ({id, active}: ActiveDTO) => {
  return client.patch<UserUpdateDTO>(
    `/api/user/${id}`,
    {
      active,
    }
  )
}

export const doWhoami = async ({
  onSuccess,
  onError,
}: {
  onSuccess?: (me: ILoginUser | null) => void;
  onError?: () => void;
}) => {
  let isError = true;
  let data: ILoginUser | null = null;
  const jwt = window.localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
  if (jwt) {
    const loginUser = decodeJWT(jwt);
    if (loginUser) {
      try {
        const response = await whoami(loginUser.id);
        if (response.status === 200) {
          isError = false;
          data = response.data;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  if (isError && onError) {
    onError();
  }
  if (!isError && onSuccess) {
    onSuccess(data);
  }
};
