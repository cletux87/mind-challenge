import { IdRequestSchema } from '@mind-challenge4/share-types';

export const validateGetIdIsNumber = (req, res, next) => {
  try {
    const id = req.params.id;
    IdRequestSchema.parse({ id });
    next();
  } catch (err: any) {
    res.status(400);
    res.json({ errors: err.errors[0].message });
  }
};
