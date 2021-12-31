import { rest } from 'msw';
import {
  conservationPracticeCategory,
  coloradoProjects,
  coloradoInitiatives,
  resources,
  relatedResources,
  landUseSection,
} from './constants';

const baseURL = 'http://localhost';
const postLandscapeInitiatives = `${baseURL}/landscapeInitiatives`;
const postProjectSearchData = `${baseURL}/project/projectSearch`;
const postSearchData = `${baseURL}/practiceSearch`;
const getResourcesQuery = `${baseURL}/resourceConcern/concern`;
const getRelatedResource = `${baseURL}/relatedResourceConcernCategory`;
const landUseSectionData = `${baseURL}/categories`;

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

const landUseSectionHandler = rest.get(
  landUseSectionData,
  async (req, res, ctx) => {
    return res(ctx.json(landUseSection));
  }
);

export const handlers = [
  initHandler,
  projHandler,
  practiceHandler,
  resourceHandler,
  relatedResourceHandler,
  landUseSectionHandler,
];
