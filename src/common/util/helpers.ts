export const sortStateList = (stateList: any) => {
  if (!stateList.length) return [];
  return stateList.sort(function(a: any, b: any) {
    const stateA = a.attributes.state_abbr
    const stateB = b.attributes.state_abbr
    if (stateA < stateB) {
      return -1;
    }
    if (stateA > stateB) {
      return 1;
    }
    return 0;
  });
}
