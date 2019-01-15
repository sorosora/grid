import { css } from 'styled-components';
import getValue from 'get-value';
import { media } from './breakpoints';
import { breakpoints, defaultGrid } from './defaultValue';

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

const getGridSetting = (props, cssPropsMap) => {
  // custom grid setting
  let customGrid = {};
  Object.values(cssPropsMap).forEach(prop => {
    if (props[prop]) customGrid[prop] = props[prop];
  });
  // theme grid setting
  const themeGrid = getValue(props, 'theme.grid', { default: {} });
  // combine all grid settings
  return {...defaultGrid, ...themeGrid, ...customGrid};
};

const getCssStyle = (cssPropsMap, gridSetting, breakpointKey) =>
  Object.keys(cssPropsMap).map(cssProp => {
    const cssValue = getValue(gridSetting, `${cssPropsMap[cssProp]}.${breakpointKey}`, '');
    if (!cssValue) return;
    return `
      ${cssProp}: ${cssValue};
    `
  }).join('');

// get css style with different breakpoints
const getCssWithBreakpoints = (props, cssPropsMap) => {
  const gridSetting = getGridSetting(props, cssPropsMap);
  return Object.keys(breakpoints).map((breakpoint, key) => {
    const cssStyle = getCssStyle(cssPropsMap, gridSetting, key);
    return css`
      /* desktop-first */
      ${cssStyle && breakpoint !== 'desktop' ? `${media[breakpoint]} {` : ''};
      ${cssStyle}
      ${cssStyle && breakpoint !== 'desktop' ? '}' : ''};
    `
  });
};

/**
 * @param props
 * @param {object} cssPropsMap - {cssProp: gridSettingProp}
 * @param {css} base - base css style
 * @returns {*[]}
 */
const getCss = (props, cssPropsMap, base = css``) => [].concat(base, getCssWithBreakpoints(props, cssPropsMap));

export { isNaN, getHalfMeasure, percentage, getCss };
