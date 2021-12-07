export function filterLandscapeInitiativeLayers(initiativeList, filterList) {
  initiativeList.filter((layer: Layer) => {
    return (
      filterList.findIndex((intiativeName: string) => {
        if (intiativeName.includes('_')) {
          return intiativeName.includes(
            layer.title.slice(layer.title.indexOf('_') + 1)
          );
        }
        return intiativeName.includes(layer.title);
      }) > 0
    );
  });
}

export default { filterLandscapeInitiativeLayers };
