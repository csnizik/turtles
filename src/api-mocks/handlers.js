import { rest } from 'msw';
import {
  conservationPracticeCategory,
  coloradoProjects,
  coloradoInitiatives,
  resources,
  relatedResources,
} from './constants';

const baseURL = 'http://localhost';
const postLandscapeInitiatives = `${baseURL}/landscapeInitiatives`;
const postProjectSearchData = `${baseURL}/project/projectSearch`;
const postSearchData = `${baseURL}/practiceSearch`;
const getResourcesQuery = `${baseURL}/resourceConcern/concern`;
const getRelatedResource = `${baseURL}/relatedResourceConcernCategory`;

const practiceHandler = rest.post(postSearchData, async (req, res, ctx) => {
  return res(ctx.json(conservationPracticeCategory));
});

const projHandler = rest.post(postProjectSearchData, async (req, res, ctx) => {
  return res(ctx.json(coloradoProjects));
});

const initHandler = rest.post(
  postLandscapeInitiatives,
  async (req, res, ctx) => {
    return res(ctx.json(coloradoInitiatives));
  }
);

const resourceHandler = rest.get(getResourcesQuery, async (req, res, ctx) => {
  return res(ctx.json(resources));
});

const relatedResourceHandler = rest.get(
  getRelatedResource,
  async (req, res, ctx) => {
    return res(ctx.json(relatedResources));
  }
);

export const handlers = [
  initHandler,
  projHandler,
  practiceHandler,
  resourceHandler,
  relatedResourceHandler,
];
