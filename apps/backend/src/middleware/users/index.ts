export const isAdminUser = (req, res, next) => {
  const user = req.user;
  if (user.role === 'ADMIN') {
    next();
  } else {
    res.status(401);
    res.json({ errors: 'Un-authorized admin functions' });
  }
};

export const changeIdToMe = (req, res, next) => {
  const user = req.user;
  req.params.id = user.id;
  next();
};
