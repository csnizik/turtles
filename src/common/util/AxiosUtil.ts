import axios from 'axios';

const baseRequest = axios.create({
  baseURL: 'https://greyworm-endo-admin.spatialfrontlab.com/',
});

export function getRequest(path: string) {
  return baseRequest.get(path);
}

export function getReport(path: string) {
  return getRequest(`/congressionalReport/${path}`);
}
