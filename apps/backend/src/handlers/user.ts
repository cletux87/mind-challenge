import {
  getUser as getUserService,
  getAllUsers,
  deleteUser as deleteUserService,
  createUser as createUserService,
  updateUser as updateUserService,
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
  const users = await getAllUsers();
  res.json({ data: users });
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
    const user = await deleteUserService(id);
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
