import { css } from 'styled-components';
import getValue from 'get-value';
import { createBreakpoints } from '@sorosora/styled-breakpoints';
import { defaultGrid } from './defaultValue';

let media;

let breakpointsArray;

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

const breakpointsToArray = (breakpoints) => {
  const result = Object.keys(breakpoints).map(key => ({
    name: key,
    value: breakpoints[key],
  }));
  result.sort((a, b) => parseInt(b.value, 10) - parseInt(a.value, 10));
  return result;
};

const gridObjectToArray = (gridSetting) => {
  const copyGridSetting = gridSetting;
  const valueArray = [];
  Object.keys(gridSetting).forEach(prop => {
    switch(prop) {
      case 'padding':
      case 'gutter':
      case 'verticalGutter':
      case 'gridWidth':
      case 'overflowHidden':
      case 'width':
      case 'offset':
      case 'order':
      case 'enabled':
      case 'showGrid':
        if (typeof gridSetting[prop] !== 'object' || Array.isArray(gridSetting[prop])) break;
        breakpointsArray.forEach(breakpoint => {
          valueArray.push(gridSetting[prop][breakpoint.name])
        });
        copyGridSetting[prop] = valueArray;
        break;
      default:
    }
  });
  return copyGridSetting;
};

const getGridSetting = (props) => {
  // custom grid setting
  let customGrid = {};
  Object.keys(defaultGrid).forEach(prop => {
    if (props[prop]) customGrid[prop] = props[prop];
  });
  // theme grid setting
  const themeGrid = getValue(props, 'theme.grid', { default: {} });
  // combine all grid settings
  const gridSetting = {...defaultGrid, ...themeGrid, ...customGrid};
  if (!breakpointsArray) {
    breakpointsArray = breakpointsToArray(gridSetting.breakpoints);
  }
  return gridObjectToArray(gridSetting);
};

const getCssStyle = (styles, gridSetting, breakpointKey) =>
  styles.map(style => {
    let isFunc = typeof style === 'function';
    if (!isFunc) return style;
    return style(gridSetting, breakpointKey);
  });

// get css style with different breakpoints
const getCssWithMedia = (props, styles) => {
  const gridSetting = getGridSetting(props);
  if (!media) {
    media = {};
    const { max } = createBreakpoints(gridSetting.breakpoints);
    breakpointsArray.forEach(breakpoint => {
      if (breakpoint.name !== 'desktop') {
        media[breakpoint.name] = max(breakpoint.name);
      }
    });
  }
  return breakpointsArray.map((breakpoint, key) => {
    const cssStyle = getCssStyle(styles, gridSetting, key);
    return css`
      /* desktop-first */
      ${breakpoint.name !== 'desktop' ? `${media[breakpoint.name]} {` : ''};
      ${cssStyle}
      ${breakpoint.name !== 'desktop' ? '}' : ''};
    `
  });
};

export { isNaN, getHalfMeasure, percentage, getCssWithMedia };
