import {
  searchUserSchema,
  userRegisterSchema,
} from '@mind-challenge4/share-types';
import e from 'express';

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

// I only can see my results or admin all results
export const onlyMeOrAdmin = (req, res, next) => {
  const user = req.user;
  if (user.role === 'ADMIN') {
    next();
  } else if (user.role === 'USER' && req.params.id == req.user.id) {
    next();
  } else {
    res.status(401);
    res.json({ errors: 'Un-authorized admin functions' });
  }
};
