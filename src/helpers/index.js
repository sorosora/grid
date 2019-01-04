const isNaN = (value) => {
  const n = Number(value);
  const nSelf = n;
  return nSelf !== n;
};

const getHalfMeasure = (measure) => {
  if (!measure) {
    return '';
  }
  const match = measure.match(/^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/);
  if (!match) {
    return '';
  }
  return Number(match[1]) === 0 ? '0' : `${match[1] / 2}${match[2]}`;
};

const percentage = (value) => {
  if (isNaN(value)) {
    return '';
  }
  return `${value * 100}%`;
};

export { isNaN, getHalfMeasure, percentage };
