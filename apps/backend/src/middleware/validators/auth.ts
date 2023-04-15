import { userSignInSchema } from '@mind-challenge4/share-types';

export const validateAuthSchema = (req, res, next) => {
  try {
    userSignInSchema.parse({
      email: req.body.email,
      password: req.body.password,
    });
    next();
  } catch (err: any) {
    res.status(400);
    res.json({ errors: err.errors[0].message });
  }
};
