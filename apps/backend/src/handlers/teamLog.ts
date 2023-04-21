import { getAllLogs as getAllLogsService } from '../service/logs';

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
