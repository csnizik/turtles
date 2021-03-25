import axios from 'axios';

const baseURL = 'https://greyworm-endo-admin.spatialfrontlab.com/';

const baseRequest = axios.create({
  baseURL
});

export function getRequest(path: string) {
  return baseRequest.get(path);
}

export function getReport(path: string) {
  return getRequest(`/congressionalReport/${path}`);
}
