// Query Help: https://developers.arcgis.com/javascript/latest/sample-code/featurelayer-query-basic/
// eslint-disable-next-line import/prefer-default-export
export const queryLayer = (
  layer: any,
  whereClause: string,
  outputFields: string[]
) => {
  const query = layer.createQuery();
  query.where = whereClause;
  query.outFields = outputFields;

  return layer.queryFeatures(query).then((queryResults: any) => {
    return queryResults;
  });
};
