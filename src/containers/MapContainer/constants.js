import Extent from '@arcgis/core/geometry/Extent';

// Basemap type
export const topoBaseMap = 'topo-vector';

// View constraints on map
const MIN_ZOOM = 6;
const MAX_ZOOM = 3;
export const viewConstraints = {
  maxZoom: MAX_ZOOM,
  minZoom: MIN_ZOOM,
};

// Longitude / Latitude for center of map
export const CENTER_COORDINATES = [-96, 36];

// Id for the ArcGis Map Element
export const VIEW_DIV = 'viewDiv';

const simpleFillColor = '#4689e0';
<<<<<<< HEAD

const fillBorderColor = '#04d9ff';

=======

const fillBorderColor = '#04d9ff';

>>>>>>> devRedo
export const highlightSymbol = {
  type: 'simple-fill',
  color: simpleFillColor,
  style: 'solid',
  outline: {
    color: fillBorderColor,
    width: 1,
  },
};

// Extents for composite views
export const alaskaExtent = new Extent({
  xmin: -4847539.802087865,
  ymin: 1848924.3741533272,
  xmax: -1623658.5396487257,
  ymax: 5200118.145045477,
  spatialReference: {
    wkid: 102009,
  },
});

export const caribbeanExtent = {
  xmin: 3071284.104725703,
  ymin: -168471.0380679945,
  xmax: 3379261.7388742953,
  ymax: 151668.7701679944,
  spatialReference: {
    wkid: 102965,
  },
};

export const hawaiiExtent = {
  xmin: -6379279.569137463,
  ymin: 1550651.8869120702,
  xmax: -5898836.886565102,
  ymax: 2050067.4652293278,
  spatialReference: {
    wkid: 102965,
  },
};

// Constans for composite views
export const ALASKA_CENTER = [-160, 65];
export const ALASKA_ZOOM = 2;
export const CARIBBEAN_CENTER = [-66, 18];
export const CARIBBEAN_ZOOM = 6;
export const HAWAII_CENTER = [-157, 20];
export const HAWAII_ZOOM = 5;
