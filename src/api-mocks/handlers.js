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
  practices,
  statesList,
  associatedPractices,
  resourceConcern,
} from './constants';
const baseURL = 'http://localhost';
const postLandscapeInitiatives = `${baseURL}/landscapeInitiatives`;
const postProjectSearchData = `${baseURL}/project/projectSearch`;
const postSearchData = `${baseURL}/practiceSearch`;
const getResourcesQuery = `${baseURL}/resourceConcern/concern`;
const getRelatedResource = `${baseURL}/relatedResourceConcernCategory`;
const landUseSectionData = `${baseURL}/categories`;
const getCategoryQuery = `${baseURL}/practice/categories`;
const getPracticeQuery = `${baseURL}/practice/catagories/practices`;
const StateListData = `${baseURL}/states`;
const assocPracticeQuery = `${baseURL}/practice/associatedPractice`;
const getResourceConcern = `${baseURL}/resourceConcern/concern/category/:swapaCategory`;

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

const resourceConcernHandler = rest.get(
  getResourceConcern,
  async (req, res, ctx) => {
    const { swapaCategory } = req.params;
    return res(ctx.json(resourceConcern));
  }
);

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

const getPracticeHandler = rest.get(getPracticeQuery, async (req, res, ctx) => {
  return res(ctx.json(practices));
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
  resourceConcernHandler,
  getPracticeHandler,
];
