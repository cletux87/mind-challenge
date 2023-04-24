import {
  getAllLogs as getAllLogsService,
  getLogs as getLogsService,
} from '../service/logs';

export const createTeamLog = async (req, res) => {
  res.json({ data: 'createTeamLog' });
};

export const getTeamLog = async (req, res) => {
  res.json({ data: 'getTeamLog' });
};

export const getTeamLogs = async (req, res) => {
  res.json({ data: 'getTeamLogs' });
};

export const getAllLogs = async (req, res) => {
  const logs = await getAllLogsService();
  res.json({ data: logs });
};

export const getMyLogs = async (req, res) => {
  try {
    const id = parseInt(req.user.id);
    const logs = await getLogsService({
      personMoveId: id,
    });
    res.json({ data: logs });
  } catch (e) {
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
    res.status(500);
    res.json({ errors: 'Unable to get logs' });
  }
};
