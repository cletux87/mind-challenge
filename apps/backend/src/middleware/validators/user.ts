import {
  searchUserSchema,
  userRegisterSchema,
} from '@mind-challenge4/share-types';

export const validateGetUserSchema = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) {
      throw Error('Id is not a number');
    }
    next();
  } catch (e) {
    res.status(400);
    res.json({ errors: 'ID data format received' });
  }
};

export const validateCreateUserSchema = (req, res, next) => {
  try {
    userRegisterSchema.parse({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      role: req.body.role,
      englishLevel: req.body.englishLevel,
      password: req.body.password,
      skills: req.body.skills,
      cvLink: req.body.cvLink,
    });
    next();
  } catch (err) {
    res.status(400);
    res.json({ errors: err.errors[0].message });
  }
};

export const validateSearchUserQueryParams = (req, res, next) => {
  try {
    searchUserSchema.parse({
      email: req.query.email,
      teamId: req.query.teamId,
    });
    next();
  } catch (err) {
    res.status(400);
    res.json({ errors: err.errors[0].message });
  }
};
