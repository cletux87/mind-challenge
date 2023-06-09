import { createJWT } from '../modules/auth';
import { signIn as signInService } from '../service/auth';

export const signIn = async (req, res) => {
  try {
    const user = await signInService({
      email: req.body.email,
      password: req.body.password,
    });
    if (!user) {
      res.status(401);
      res.json({ errors: 'User not found or Password incorrect' });
      return;
    }
    const jwt = await createJWT(user);
    res.json({ jwt });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({ errors: 'Something went wrong please try again later' });
  }
};
