export function filterLandscapeInitiativeLayers(initiativeList, filterList) {
  return initiativeList.filter((layer) => {
    return (
      filterList.findIndex((intiativeName) => {
        return layer.title.includes(intiativeName);
      }) >= 0
    );
  });
}

export default { filterLandscapeInitiativeLayers };
