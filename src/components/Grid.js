import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { getHalfMeasure, getCssWithMedia } from '../helpers';
import Col from './Col';

const Grid = styled.div(
  css`
    display: flex;
    flex-wrap: wrap;
  `,
  (props) => {
    const styles = css`
      margin-top: ${(gridSetting, breakpointKey) => getHalfMeasure(`-${gridSetting.verticalGutter[breakpointKey]}`)};
      margin-bottom: ${(gridSetting, breakpointKey) => getHalfMeasure(`-${gridSetting.verticalGutter[breakpointKey]}`)};
      margin-left: ${(gridSetting, breakpointKey) => getHalfMeasure(`-${gridSetting.gutter[breakpointKey]}`)};
      margin-right: ${(gridSetting, breakpointKey) => getHalfMeasure(`-${gridSetting.gutter[breakpointKey]}`)};
      
      ${Col} {
        padding-top: ${(gridSetting, breakpointKey) => getHalfMeasure(gridSetting.verticalGutter[breakpointKey])};
        padding-bottom: ${(gridSetting, breakpointKey) => getHalfMeasure(gridSetting.verticalGutter[breakpointKey])};
        padding-left: ${(gridSetting, breakpointKey) => getHalfMeasure(gridSetting.gutter[breakpointKey])};
        padding-right: ${(gridSetting, breakpointKey) => getHalfMeasure(gridSetting.gutter[breakpointKey])};
      }
    `;
    return getCssWithMedia(props, styles);
  },
  (props) => {
    if (!props.showGrid) return;
    const styles = css`
      position: relative;
      
      &:after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin-top: ${(gridSetting, breakpointKey) => getHalfMeasure(gridSetting.verticalGutter[breakpointKey])};
        margin-bottom: ${(gridSetting, breakpointKey) => getHalfMeasure(gridSetting.verticalGutter[breakpointKey])};
        background: repeating-linear-gradient(
          90deg,
          rgba(255,255,255,0),
          rgba(255,255,255,0) 0,
          rgba(255,255,255,0) ${(gridSetting, breakpointKey) => getHalfMeasure(gridSetting.gutter[breakpointKey])},
          rgba(255,100,20,0.3) 0,
          rgba(255,100,20,0.3) ${(gridSetting, breakpointKey) => `calc(${(1 / props.showGrid[breakpointKey]) * 100}% - ${getHalfMeasure(gridSetting.gutter[breakpointKey])})`},
          rgba(255,255,255,0) 0,
          rgba(255,255,255,0) ${(gridSetting, breakpointKey) => `${(1 / props.showGrid[breakpointKey]) * 100}%`}
        );
        pointer-events: none;
      }
    `;
    return getCssWithMedia(props, styles);
  }
);

Grid.propTypes = {
  gutter: PropTypes.arrayOf(PropTypes.string),
  verticalGutter: PropTypes.arrayOf(PropTypes.string),
  showGrid: PropTypes.arrayOf(PropTypes.number),
};

export default Grid;
