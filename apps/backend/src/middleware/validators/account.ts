import {
  accountRegisterSchema,
  getTeamsSchema,
} from '@mind-challenge4/share-types';

export const validateAccountCreateSchema = (req, res, next) => {
  try {
    accountRegisterSchema.parse({
      name: req.body.name,
      clientName: req.body.clientName,
    });
    next();
  } catch (err: any) {
    res.status(400);
    res.json({ errors: err.errors[0].message });
  }
};

export const validateGetTeamSchema = (req, res, next) => {
  try {
    getTeamsSchema.parse({
      accountId: parseInt(req.params.id),
    });
    next();
  } catch (err: any) {
    res.status(400);
    res.json({ errors: err.errors[0].message });
  }
};
