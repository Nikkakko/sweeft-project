import axios from 'axios';

const BASE_URL =
  'http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllUsers = async (page: number, size: number, options = {}) => {
  return await instance.get(`user/${page}/${size}`, options);
};

export const getAllFriends = async (
  page: number,
  size: number,
  userId?: number
) => {
  return await instance.get(`user/${userId}/friends/${page}/${size}`);
};

export const getSingleUser = async (userId: number) => {
  return await instance.get(`user/${userId}`);
};

export default instance;
