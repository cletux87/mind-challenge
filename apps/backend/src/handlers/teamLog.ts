import {
  getAllLogs as getAllLogsService,
  getLogs as getLogsService,
} from '../service/logs';

export const createTeamLog = async (req, res) => {
  res.json({ data: 'createTeamLog' });
};

export const getAllLogs = async (req, res) => {
  try {
    const logs = await getAllLogsService();
    res.json({ data: logs });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({ errors: 'Something went wrong please try again later' });
  }
};

export const getMyLogs = async (req, res) => {
  try {
    const id = parseInt(req.user.id);
    const logs = await getLogsService({
      personMoveId: id,
    });
    res.json({ data: logs });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({ errors: 'Unable to get own logs' });
  }
};

export const getLogs = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const logs = await getLogsService({
      personMoveId: id,
    });
    res.json({ data: logs });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({ errors: 'Unable to get logs' });
  }
};

export const getTeamLogs = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const logs = await getLogsService({
      teamMoveId: id,
    });
    res.json({ data: logs });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({ errors: 'Unable to get logs' });
  }
};
