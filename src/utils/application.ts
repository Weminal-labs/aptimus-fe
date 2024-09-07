import axios from "axios";
import { getApiUrl } from "./getApiUrl";
const apiURL = getApiUrl();

export const createApplication = async (
  name: string,
  description: string,
  team_id: string,
  image: string
) => {
  try {
    const response = await axios.post(`${apiURL}/applications`, {
      name,
      team_id,
      description,
      image,
      public_key: "",
      private_key: "",
    });

    if (response.status !== 201) return null;
    return response.data;
  } catch (err) {
    return null;
  }
};

export const getApplicationsByTeam = async (team_id: string) => {
  try {
    const response = await axios.get(`${apiURL}/applications/team/${team_id}`);
    return response.data;
  } catch (err) {
    return null;
  }
};

export const getApplicationInfor = async (id: string) => {
  try {
    const response = await axios.get(`${apiURL}/applications/${id}`);

    const providers = (
      await axios.get(`${apiURL}/applications/${id}/auth-providers`)
    ).data;

    if (providers) response.data.providers = providers;
    return response.data;
  } catch (err) {
    return null;
  }
};

export const updateAPIKeys = async (
  id: string,
  publicKey: string,
  privateKey: string
) => {
  try {
    const response = await axios.put(`${apiURL}/applications/${id}/keys`, {
      public_key: publicKey,
      private_key: privateKey,
    });
    return response.data;
  } catch (err) {
    return null;
  }
};

export const addProvider = async (id: string, type: string, key: string) => {
  try {
    const response = await axios.post(
      `${apiURL}/applications/${id}/auth-providers`,
      {
        type,
        key,
      }
    );
    return response.data;
  } catch (err) {
    return null;
  }
};

export const deleteProvider = async (app_id: string, id: string) => {
  try {
    const response = await axios.delete(
      `${apiURL}/applications/${id}/auth-providers/${app_id}`
    );
    return response.data;
  } catch (err) {
    return null;
  }
};

export const updateApplication = async (
  id: string,
  name: string,
  image: string,
  description: string
) => {
  try {
    const response = await axios.put(`${apiURL}/applications/${id}}`, {
      description,
      name,
      image,
    });
    return response.data;
  } catch (err) {
    return null;
  }
};
