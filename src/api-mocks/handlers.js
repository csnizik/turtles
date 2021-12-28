import { rest } from 'msw';
import {
  conservationPracticeCategory,
  coloradoProjects,
  coloradoInitiatives,
  landUseSection,
} from './constants';

const baseURL = 'http://localhost';
const postLandscapeInitiatives = `${baseURL}/landscapeInitiatives`;
const postProjectSearchData = `${baseURL}/project/projectSearch`;
const postSearchData = `${baseURL}/practiceSearch`;
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
  landUseSectionHandler,
];
