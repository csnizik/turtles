import Extent from '@arcgis/core/geometry/Extent';

// Basemap type
export const topoBaseMap = 'topo-vector';

// View constraints on map
const MIN_ZOOM = 8;
const MAX_ZOOM = 3;
export const viewConstraints = {
  maxZoom: MAX_ZOOM,
  minZoom: MIN_ZOOM,
};

// Longitude / Latitude for center of map
export const CENTER_COORDINATES = [-96, 36];


// Id for the ArcGis Map Element
export const VIEW_DIV = 'viewDiv';

const fillBorderColor = '#13A8F7';

export const highlightSymbol = {
  type: 'simple-line',
  color: fillBorderColor,
  style: 'solid',
  width: '5px',
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

// List of states that should zoom in further
export const SMALL_STATES = ['CT', 'DE', 'NH', 'NJ', 'MD', 'RI', 'VT'];

export const STATE_LAYER_ID = 'Conservation_Innovation_Grant_4680';

// list of state codes used for updating url
export const stateCodes = {
  'AL': '01',
  'AK': '02',
  'AZ': '04',
  'AR': '05',
  'CA': '06',
  'CO': '08',
  'CT': '09',
  'DE': '10',
  'DC': '11',
  'FL': '12',
  'GA': '13',
  'HI': '15',
  'ID': '16',
  'IL': '17',
  'IN': '18',
  'IA': '19',
  'KS': '20',
  'KY': '21',
  'LA': '22',
  'ME': '23',
  'MD': '24',
  'MA': '25',
  'MI': '26',
  'MN': '27',
  'MS': '28',
  'MO': '29',
  'MT': '30',
  'NE': '31',
  'NV': '32',
  'NH': '33',
  'NJ': '34',
  'NM': '35',
  'NY': '36',
  'NC': '37',
  'ND': '38',
  'OH': '39',
  'OK': '40',
  'OR': '41',
  'PA': '42',
  'PR': '72',
  'RI': '44',
  'SC': '45',
  'SD': '46',
  'TN': '47',
  'TX': '48',
  'UT': '49',
  'VT': '50',
  'VA': '51',
  'VI': '78',
  'WA': '53',
  'WV': '54',
  'WI': '55',
  'WY': '56'
};
export const stAbbrs = {
  '01': 'AL',
  '02': 'AK',
  '04': 'AZ',
  '05': 'AR',
  '06': 'CA',
  '08': 'CO',
  '09': 'CT',
  '10': 'DE',
  '11': 'DC',
  '12': 'FL',
  '13': 'GA',
  '15': 'HI',
  '16': 'ID',
  '17': 'IL',
  '18': 'IN',
  '19': 'IA',
  '20': 'KS',
  '21': 'KY',
  '22': 'LA',
  '23': 'ME',
  '24': 'MD',
  '25': 'MA',
  '26': 'MI',
  '27': 'MN',
  '28': 'MS',
  '29': 'MO',
  '30': 'MT',
  '31': 'NE',
  '32': 'NV',
  '33': 'NH',
  '34': 'NJ',
  '35': 'NM',
  '36': 'NY',
  '37': 'NC',
  '38': 'ND',
  '39': 'OH',
  '40': 'OK',
  '41': 'OR',
  '42': 'PA',
  '72': 'PR',
  '44': 'RI',
  '45': 'SC',
  '46': 'SD',
  '47': 'TN',
  '48': 'TX',
  '49': 'UT',
  '50': 'VT',
  '51': 'VA',
  '78': 'VI',
  '53': 'WA',
  '54': 'WV',
  '55': 'WI',
  '56': 'WY',
};