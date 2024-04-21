import {
  getProfileInfoById,
  getAlexaInfoById,
  getAlexaInteractionsById,
} from "./helpers/api_helpers";
import { processUserData } from "./profile_service";

export const pullUserData = async (id, date) => {
  const offset = new Date(date).getTimezoneOffset() / 60;
  const res = await getProfileInfoById(id, date, offset);
  const activity = await processUserData(res.response, date, offset);
  return activity;
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
