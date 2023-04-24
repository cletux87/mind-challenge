import {
  createTeam as createTeamService,
  getTeam as getTeamService,
  getAllTeams as getAllTeamsService,
  getAccountTeams as getAccountTeamsService,
} from '../service/team';

export const createTeam = async (req, res) => {
  try {
    const accountId = parseInt(req.body.accountId);
    console.log('Pass TO SERVICE');
    const team = await createTeamService({
      teamName: req.body.teamName,
      accountId,
    });
    res.json({ data: team });
  } catch (e) {
    console.log(e);
    res.status(400);
    res.json({ errors: 'assignedAccount has an incorrect format' });
  }
};

export const getTeam = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const team = await getTeamService(id);
    res.json({ data: team });
  } catch (e) {
    console.log(e);
    res.status(400);
    res.json({ errors: 'Id has an incorrect format' });
  }
};

export const getAccountTeams = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const team = await getAccountTeamsService(id);
    res.json({ data: team });
  } catch (e) {
    console.log(e);
    res.status(400);
    res.json({ errors: 'Id has an incorrect format' });
  }
};

export const getTeams = async (req, res) => {
  try {
    const teams = await getAllTeamsService();
    res.json({ data: teams });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({ errors: 'Something went wrong please try again later' });
  }
};

export const deleteTeam = async (req, res) => {
  res.json({ data: 'deleteTeam' });
};
