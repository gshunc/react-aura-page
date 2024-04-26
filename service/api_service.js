import {
  getProfileInfoById,
  getAlexaInfoById,
  getAlexaInteractionsById,
  getMonitoringDataById,
} from "../helpers/api_helpers";

export const pullUserData = async (id, date) => {
  const offset = new Date(date).getTimezoneOffset() / 60;
  const res = await getProfileInfoById(id, date, offset);
  return res.response;
};

export const pullAlexaGraphData = async (id, date) => {
  const offset = new Date(date).getTimezoneOffset() / 60;
  const res = await getAlexaInfoById(id, date, offset);
  return res.response;
};

export const pullAlexaInteractions = async (id, date) => {
  const offset = new Date(date).getTimezoneOffset() / 60;
  const res = await getAlexaInteractionsById(id, date, offset);
  return res.response;
};

export const pullMonitoringData = async (id, date) => {
  const offset = new Date(date).getTimezoneOffset() / 60;
  const res = await getMonitoringDataById(id, date, offset);
  return res.response;
};
