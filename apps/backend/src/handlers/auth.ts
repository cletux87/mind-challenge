import { createJWT } from '../modules/auth';
import { signIn as signInService } from '../service/auth';

export const signIn = async (req, res) => {
  const user = await signInService({
    email: req.body.email,
    password: req.body.password,
  });
  if (!user) {
    res.status(401);
    res.json({ errors: 'User not found or Password incorrect' });
    return;
  }
  const token = await createJWT(user);
  res.json({ token });
};
