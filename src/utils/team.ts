import axios from "axios";
import { getApiUrl } from "./getApiUrl";
const apiURL = getApiUrl();

export const getMainTeam = async (user_id: string) => {
  try {
    const response = await axios.get(`${apiURL}/team/main-team/${user_id}`);
    return response.data;
  } catch (err) {
    return null;
  }
};

export const createTeam = async (team_name: string, user_id: string) => {
  try {
    const response = await axios.post(`${apiURL}/team`, {
      name: team_name,
      image: "",
    });

    if (response.status !== 200) return null;
    await addMember(response.data.id, user_id, true);
    return response.data;
  } catch (err) {
    return null;
  }
};

export const addMember = async (
  team_id: string,
  user_id: string,
  is_leader: boolean
) => {
  try {
    const response = await axios.post(`${apiURL}/team/add-member`, {
      team_id,
      user_id,
      is_leader,
    });

    return response.data;
  } catch (err) {
    return null;
  }
};

export const addMemberByEmail = async (team_id: string, email: string) => {
  try {
    const response = await axios.post(`${apiURL}/team/${team_id}/add-member`, {
      email,
    });

    return response.data;
  } catch (err) {
    return null;
  }
};

export const getTeams = async (user_id: string) => {
  try {
    const response = await axios.get(`${apiURL}/team/all-teams/${user_id}`);
    return response.data;
  } catch (err) {
    return null;
  }
};

export const getMemberTeam = async (team_id: string) => {
  try {
    const response = await axios.get(`${apiURL}/team/${team_id}/members`);
    return response.data;
  } catch (err) {
    return null;
  }
};

export const removeMember = async (team_id: string, user_id: string) => {
  try {
    const response = await axios.delete(
      `${apiURL}/team/${team_id}/members/${user_id}`
    );
    return response.data;
  } catch (err) {
    return null;
  }
};
