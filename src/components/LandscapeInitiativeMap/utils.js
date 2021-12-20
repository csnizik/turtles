export function filterLandscapeInitiativeLayers(initiativeList, filterList) {
  console.log('init list: ', initiativeList);
  console.log('filter list: ', filterList);
  return initiativeList.filter((layer) => {
    return (
      filterList.findIndex((intiativeName) => {
        return layer.title.includes(intiativeName);
      }) >= 0
    );
  });
}

export default { filterLandscapeInitiativeLayers };
