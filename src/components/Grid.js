import styled, { css } from 'styled-components';
import { media } from '../helpers/breakpoints';
import { getHalfMeasure } from '../helpers';
import { gridGutter } from '../helpers/defaultValue';
import Col from './Col';

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: ${({ 'vertical-gutter': [desktop = ''] = [] }) => getHalfMeasure(`-${desktop}`)};
  margin-bottom: ${({ 'vertical-gutter': [desktop = ''] = [] }) => getHalfMeasure(`-${desktop}`)};
  margin-left: ${({ gutter: [desktop = gridGutter] = [] }) => getHalfMeasure(`-${desktop}`)};
  margin-right: ${({ gutter: [desktop = gridGutter] = [] }) => getHalfMeasure(`-${desktop}`)};
  
  ${({ gutter: [gutter = gridGutter] = [], 'vertical-gutter': [verticalGutter = ''] = [], 'show-grid': showGrid }) => (showGrid ? css`
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin-top: ${getHalfMeasure(verticalGutter)};
      margin-bottom: ${getHalfMeasure(verticalGutter)};
      background: repeating-linear-gradient(
        90deg,
        rgba(255,255,255,0),
        rgba(255,255,255,0) 0,
        rgba(255,255,255,0) ${getHalfMeasure(gutter)},
        rgba(255,100,20,0.3) 0,
        rgba(255,100,20,0.3) calc(${(1 / showGrid) * 100}% - ${getHalfMeasure(gutter)}),
        rgba(255,255,255,0) 0,
        rgba(255,255,255,0) ${(1 / showGrid) * 100}%
      );
      pointer-events: none;
    }
  ` : '')}
  
  ${Col} {
    padding-top: ${({ 'vertical-gutter': [desktop = ''] = [] }) => getHalfMeasure(desktop)};
    padding-bottom: ${({ 'vertical-gutter': [desktop = ''] = [] }) => getHalfMeasure(desktop)};
    padding-left: ${({ gutter: [desktop = gridGutter] = [] }) => getHalfMeasure(desktop)};
    padding-right: ${({ gutter: [desktop = gridGutter] = [] }) => getHalfMeasure(desktop)};
  }
  
  ${media.tablet} {
    margin-top: ${({ 'vertical-gutter': [, tablet = ''] = [] }) => getHalfMeasure(`-${tablet}`)};
    margin-bottom: ${({ 'vertical-gutter': [, tablet = ''] = [] }) => getHalfMeasure(`-${tablet}`)};
    margin-left: ${({ gutter: [, tablet = ''] = [] }) => getHalfMeasure(`-${tablet}`)};
    margin-right: ${({ gutter: [, tablet = ''] = [] }) => getHalfMeasure(`-${tablet}`)};
    
    ${({ gutter: [, gutter = ''] = [], 'vertical-gutter': [, verticalGutter = ''] = [], 'show-grid': showGrid }) => (showGrid ? css`
      &:after {
        margin-top: ${getHalfMeasure(verticalGutter)};
        margin-bottom: ${getHalfMeasure(verticalGutter)};
        background: repeating-linear-gradient(
          90deg,
          rgba(255,255,255,0),
          rgba(255,255,255,0) 0,
          rgba(255,255,255,0) ${getHalfMeasure(gutter)},
          rgba(255,100,20,0.3) 0,
          rgba(255,100,20,0.3) calc(${(1 / showGrid) * 100}% - ${getHalfMeasure(gutter)}),
          rgba(255,255,255,0) 0,
          rgba(255,255,255,0) ${(1 / showGrid) * 100}%
        );
      }
   ` : '')}
    
    ${Col} {
      padding-top: ${({ 'vertical-gutter': [, tablet = ''] = [] }) => getHalfMeasure(tablet)};
      padding-bottom: ${({ 'vertical-gutter': [, tablet = ''] = [] }) => getHalfMeasure(tablet)};
      padding-left: ${({ gutter: [, tablet = ''] = [] }) => getHalfMeasure(tablet)};
      padding-right: ${({ gutter: [, tablet = ''] = [] }) => getHalfMeasure(tablet)};
    }
  }
  
  ${media.phone} {
    margin-top: ${({ 'vertical-gutter': [, , phone = ''] = [] }) => getHalfMeasure(`-${phone}`)};
    margin-bottom: ${({ 'vertical-gutter': [, , phone = ''] = [] }) => getHalfMeasure(`-${phone}`)};
    margin-left: ${({ gutter: [, , phone = ''] = [] }) => getHalfMeasure(`-${phone}`)};
    margin-right: ${({ gutter: [, , phone = ''] = [] }) => getHalfMeasure(`-${phone}`)};
    
    ${({ gutter: [, , gutter = ''] = [], 'vertical-gutter': [, , verticalGutter = ''] = [], 'show-grid': showGrid }) => (showGrid ? css`
      &:after {
        margin-top: ${getHalfMeasure(verticalGutter)};
        margin-bottom: ${getHalfMeasure(verticalGutter)};
        background: repeating-linear-gradient(
          90deg,
          rgba(255,255,255,0),
          rgba(255,255,255,0) 0,
          rgba(255,255,255,0) ${getHalfMeasure(gutter)},
          rgba(255,100,20,0.3) 0,
          rgba(255,100,20,0.3) calc(${(1 / showGrid) * 100}% - ${getHalfMeasure(gutter)}),
          rgba(255,255,255,0) 0,
          rgba(255,255,255,0) ${(1 / showGrid) * 100}%
        );
      }
    ` : '')}
    
    ${Col} {
      padding-top: ${({ 'vertical-gutter': [, , phone = ''] = [] }) => getHalfMeasure(phone)};
      padding-bottom: ${({ 'vertical-gutter': [, , phone = ''] = [] }) => getHalfMeasure(phone)};
      padding-left: ${({ gutter: [, , phone = ''] = [] }) => getHalfMeasure(phone)};
      padding-right: ${({ gutter: [, , phone = ''] = [] }) => getHalfMeasure(phone)};
    }
  }
`;

export default Grid;
