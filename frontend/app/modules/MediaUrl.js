import { ApiUrl } from "../services/api/ApiUrl";

export const MediaUrl = (uri) => {
  return `${ApiUrl()}${uri}`;
};
