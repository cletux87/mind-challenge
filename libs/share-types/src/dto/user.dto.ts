import { number, object, string, TypeOf } from 'zod';

export const userRegisterSchema = object({
  email: string({ required_error: 'Email is required' }).email('Invalid email'),
  firstName: string({ required_error: 'First name is required' }),
  lastName: string({ required_error: 'Last name is required' }),
  phone: string({ required_error: 'Phone number is required' }),
  role: string({ required_error: 'Role is required' }),
  englishLevel: string({ required_error: 'English level is required' }),
  password: string({ required_error: 'Password is needed' }),
});

export type UserRegisterDTO = TypeOf<typeof userRegisterSchema>;
export interface IUserDTO extends UserRegisterDTO {
  startDate: string;
  endDate: string;
  id?: number;
}

export type UserDTO = Omit<IUserDTO, 'password'>;

export const userSignInSchema = object({
  email: string({ required_error: 'Email is required' }).email('Invalid email'),
  password: string({ required_error: 'Password is needed' }),
});

export type UserSignInDTO = TypeOf<typeof userRegisterSchema>;

export const userUpdateSchema = object({
  email: string({ required_error: 'Email is required' }).email('Invalid email'),
  firstName: string({ required_error: 'First name is required' }),
  lastName: string({ required_error: 'Last name is required' }),
  phone: string({ required_error: 'Phone number is required' }),
  role: string({ required_error: 'Role is required' }),
  englishLevel: string({ required_error: 'English level is required' }),
  password: string({ required_error: 'Password is needed' }).optional(),
});

export type UserUpdateDTO = TypeOf<typeof userUpdateSchema>;

export const searchUserSchema = object({
  email: string({ required_error: 'Email is required' }).optional(),
  teamId: string({ required_error: 'team Id is required' }).optional(),
});

export type SearchUserDTO = TypeOf<typeof searchUserSchema>;
