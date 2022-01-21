import { rest } from 'msw';
import {
  conservationPracticeCategory,
  coloradoProjects,
  coloradoInitiatives,
  resources,
  relatedResources,
  landUseSection,
  singleResults,
  practiceCategories,
  statesList,
  associatedPractices,
} from './constants';

const baseURL = 'http://localhost';
const postLandscapeInitiatives = `${baseURL}/landscapeInitiatives`;
const postProjectSearchData = `${baseURL}/project/projectSearch`;
const postSearchData = `${baseURL}/practiceSearch`;
const getResourcesQuery = `${baseURL}/resourceConcern/concern`;
const getRelatedResource = `${baseURL}/relatedResourceConcernCategory`;
const landUseSectionData = `${baseURL}/categories`;
const getCategoryQuery = `${baseURL}/practice/categories`;
const StateListData = `${baseURL}/states`;
const assocPracticeQuery = `${baseURL}/practice/associatedPractice`;

const practiceHandler = rest.post(postSearchData, async (req, res, ctx) => {
  if (req.body.practice_category_id) {
    return res(ctx.json(conservationPracticeCategory));
  }
  if (req.body.practice_id) {
    return res(ctx.json(singleResults));
  }
});

const projHandler = rest.post(postProjectSearchData, async (req, res, ctx) => {
  return res(ctx.json(coloradoProjects));
});

const stateHandler = rest.get(StateListData, async (req, res, ctx) => {
  return res(ctx.json(statesList));
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

const getCategoryHandler = rest.get(getCategoryQuery, async (req, res, ctx) => {
  return res(ctx.json(practiceCategories));
});

const getAssocPracticeHandler = rest.get(
  assocPracticeQuery,
  async (req, res, ctx) => {
    return res(ctx.json(associatedPractices));
  }
);

export const handlers = [
  initHandler,
  stateHandler,
  projHandler,
  practiceHandler,
  resourceHandler,
  relatedResourceHandler,
  landUseSectionHandler,
  getCategoryHandler,
  getAssocPracticeHandler,
];
