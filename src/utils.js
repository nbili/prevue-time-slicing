import _ from "lodash";

let cachedData = new Map();

export function getStreamData(input) {
  if (cachedData.has(input)) {
    return cachedData.get(input);
  }
  const multiplier = input.length !== 0 ? input.length : 1;
  const complexity =
    (parseInt(window.location.search.substring(1), 10) / 100) * 25 || 25;
  const data = _.range(5).map(t =>
    _.range(complexity * multiplier).map((j, i) => {
      return {
        x: j,
        y: (t + 1) * _.random(0, 255)
      };
    })
  );
  cachedData.set(input, data);
  return data;
}
