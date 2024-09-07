import axios from "axios";
import { getApiUrl } from "./getApiUrl";
const apiURL = getApiUrl();

export const getUserByEmail = async (email: string) => {
  try {
    const response = await axios.get(
      `${apiURL}/user/get-by-email?email=${email}`
    );
    return response.data;
  } catch (err) {
    return null;
  }
};

export const createUser = async (email: string, wallet_address: string) => {
  try {
    const response = await axios.post(`${apiURL}/user/`, {
      email,
      wallet_address,
    });
    return response.data;
  } catch (err) {
    return null;
  }
};

export const updateUser = async (
  id: string,
  wallet_address: string
) => {
  try {
    const response = await axios.put(`${apiURL}/user/${id}`, {
      wallet_address,
    });
    return response.data;
  } catch (err) {
    return null;
  }
};
