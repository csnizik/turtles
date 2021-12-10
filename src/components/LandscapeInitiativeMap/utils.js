export function filterLandscapeInitiativeLayers(initiativeList, filterList) {
  return initiativeList.filter((layer) => {
    return (
      filterList.findIndex((intiativeName) => {
        if (intiativeName.includes('_')) {
          return intiativeName.includes(
            layer.title.slice(layer.title.indexOf('_') + 1)
          );
        }
        return intiativeName.includes(layer.title);
      }) >= 0
    );
  });
}

export default { filterLandscapeInitiativeLayers };
