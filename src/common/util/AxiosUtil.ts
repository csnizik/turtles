/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

const baseRequest = axios.create({
  baseURL,
});

export function getRequest(path: string) {
  return baseRequest.get(path);
}
