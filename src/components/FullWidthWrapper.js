import styled, { css } from 'styled-components';
import { media } from '../helpers/breakpoints';
import withViewport from '../helpers/withViewport';
import { getHalfMeasure } from '../helpers';

const fullWidthWrapperStyle = css`
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: ${({ viewport }) => (viewport.isIE ? `-${viewport.width / 2}px` : getHalfMeasure(`-${fullWidth}`))};
  margin-right: ${({ viewport }) => (viewport.isIE ? `-${viewport.width / 2}px` : getHalfMeasure(`-${fullWidth}`))};
  width: ${({ viewport }) => (viewport.isIE ? `${viewport.width}px` : fullWidth)};
  overflow: hidden;
`;

const fullWidthReset = css`
  left: auto;
  right: auto;
  margin-left: 0;
  margin-right: 0;
  width: 100%;
`;

const checkReset = (desktop, tablet, phone) => {
  if (typeof tablet === 'undefined' && typeof phone === 'undefined') {
    return '';
  }
  if (typeof phone === 'undefined') {
    return desktop && !tablet ? fullWidthReset : '';
  }
  return (desktop || tablet) && !phone ? fullWidthReset : '';
};

const checkFull = (desktop, tablet, phone) => {
  if (typeof tablet === 'undefined' && typeof phone === 'undefined') {
    return '';
  }
  if (typeof phone === 'undefined') {
    return !desktop && tablet ? fullWidthWrapperStyle : '';
  }
  return (!desktop || !tablet) && phone ? fullWidthWrapperStyle : '';
};

const FullWidthWrapper = withViewport(styled.div`
  ${({ enabled: [desktop = true] = [] }) => (desktop ? fullWidthWrapperStyle : '')};
  
  ${media.tablet} {
    ${({ enabled: [desktop = true, tablet] = [] }) => checkReset(desktop, tablet)};
    ${({ enabled: [desktop = true, tablet] = [] }) => checkFull(desktop, tablet)};
  }
  
  ${media.phone} {
    ${({ enabled: [desktop = true, tablet, phone] = [] }) => checkReset(desktop, tablet, phone)};
    ${({ enabled: [desktop = true, tablet, phone] = [] }) => checkFull(desktop, tablet, phone)};
  }
`);

export default FullWidthWrapper;
