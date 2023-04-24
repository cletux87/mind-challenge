import {
  getUser as getUserService,
  getAllUsers,
  deleteUser as deleteUserService,
  createUser as createUserService,
  updateUser as updateUserService,
  changeTeam,
} from '../service/user';

export const getUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await getUserService(id);
    res.json({ data: user });
    res.status(200);
  } catch (e) {
    res.status(400);
    res.json({ errors: 'Id has not a correct format' });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers({
      ...(req.query.teamId
        ? {
            teamId:
              req.query.teamId === 'null' ? null : parseInt(req.query.teamId),
          }
        : undefined),
      ...(req.query.email
        ? {
            userName: req.query.email,
          }
        : undefined),
    });
    res.json({ data: users });
  } catch (e) {
    res.status(500);
    res.json({ errors: 'Something went wrong please try again later' });
  }
};

export const createUser = async (req, res) => {
  const user = await createUserService({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    role: req.body.role,
    englishLevel: req.body.englishLevel,
    password: req.body.password,
    contextReq: req,
  });
  res.json({ data: user });
};

export const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const isActiveString = req.body.active.toLowerCase();
    const isActive = isActiveString === 'true';
    const user = await deleteUserService(id, isActive, req);
    res.json({ data: user });
  } catch (e) {
    res.status(400);
    res.json({ errors: 'Id has not a correct format' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await updateUserService({
      id: id,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      role: req.body.role,
      englishLevel: req.body.englishLevel,
      password: req.body.password,
    });
    res.json({ data: user });
  } catch (e) {
    res.status(400);
    res.json({ errors: 'Id has not a correct format' });
  }
};

export const updateUserToTeam = async (req, res) => {
  try {
    const teamId = parseInt(req.body.teamId);
    const userId = parseInt(req.body.userId);
    const user = await changeTeam({
      userId,
      teamId: teamId === 0 ? null : teamId,
    });
    res.json({ data: user });
  } catch (e) {
    res.status(400);
    res.json({ errors: 'Id has not a correct format' });
  }
};
