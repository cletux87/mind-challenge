import {
  createTeam as createTeamService,
  getTeam as getTeamService,
  getAllTeams as getAllTeamsService,
} from '../service/team';

export const createTeam = async (req, res) => {
  try {
    const accountId = parseInt(req.body.accountId);
    const team = await createTeamService({
      teamName: req.body.teamName,
      accountId,
    });
    res.json({ data: team });
  } catch (e) {
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
    res.status(400);
    res.json({ errors: 'Id has an incorrect format' });
  }
};

export const getTeams = async (req, res) => {
  const teams = await getAllTeamsService();
  res.json({ data: teams });
};

export const deleteTeam = async (req, res) => {
  res.json({ data: 'deleteTeam' });
};
