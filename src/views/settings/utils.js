import { client } from "../../apiClient";

export const updateSettings = async (updatedDict) => {
  await client.patch("/settings", updatedDict);
};
