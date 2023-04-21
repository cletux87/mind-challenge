import {
  createAccount as createAccountService,
  getAccount as getAccountService,
  getAccounts as getAccountsService,
  updateAccount as updateAccountService,
} from '../service/account';

export const createAccount = async (req, res) => {
  const account = await createAccountService({
    clientName: req.body.clientName,
    name: req.body.name,
  });
  res.json({ data: account });
};

export const getAccount = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const account = await getAccountService(id);
    res.json({ data: account });
    res.status(200);
  } catch (e) {
    res.status(400);
    res.json({ errors: 'Id has not a correct format' });
  }
};

export const getAccounts = async (req, res) => {
  const accounts = await getAccountsService();
  res.json({ data: accounts });
};

export const deleteAccount = async (req, res) => {
  res.json({ data: 'deleteAccount' });
};

export const updateAccount = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const account = await updateAccountService({
      name: req.body.name,
      clientName: req.body.clientName,
      id: id,
    });
    res.json({ data: account });
    res.status(200);
  } catch (e) {
    res.status(400);
    res.json({ errors: 'Id has not a correct format' });
  }
};
