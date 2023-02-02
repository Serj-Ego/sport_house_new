export default function filterSearchParams(params) {
  if (params) {
    let newParams = {};
    newParams = {};
    Object.keys(params).forEach((key) => {
      if (
        !(
          params[key] === undefined ||
          params[key] === null ||
          params[key] === [] ||
          params[key] === ""
        )
      ) {
        newParams[key] = params[key];
      }
    });
    return newParams;
  }
  return {};
}
