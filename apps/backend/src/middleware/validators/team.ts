import { teamRegisterSchema } from '@mind-challenge4/share-types';

export const validateTeamCreateSchema = (req, res, next) => {
  try {
    teamRegisterSchema.parse({
      teamName: req.body.teamName,
      accountId: req.body.accountId,
    });
    next();
  } catch (err: any) {
    res.status(400);
    res.json({ errors: err.errors[0].message });
  }
};
