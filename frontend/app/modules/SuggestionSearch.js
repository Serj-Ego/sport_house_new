const token = "228b6425-28c0-4fe5-82b4-29f7307e8818";

const defaultUrlGeocoder = "https://geocode-maps.yandex.ru/1.x/?";

export const suggestionSearchFetch = (text) => {
  var url = new URL(defaultUrlGeocoder);
  url.searchParams.append("apikey", token);
  url.searchParams.append("format", "json");
  url.searchParams.append("geocode", text.replace(/ /g, "+"));
  url.searchParams.append("bbox", "36.6,54.6~38.6,56.6");
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  let result = [];
  return fetch(url, options)
    .then((response) => response.json())
    .then((result) => {
      return result.response.GeoObjectCollection.featureMember;
    })
    .catch((err) => {
      return false;
    });
};
