import { UserSignInDTO } from '@mind-challenge4/share-types';
import { getUserByEmail } from '../dao/users';
import { comparePasswords } from '../modules/auth';

export const signIn = async ({ email, password }: UserSignInDTO) => {
  const user = await getUserByEmail(email);
  const isValid = await comparePasswords(password, user.password);
  return isValid ? user : null;
};
