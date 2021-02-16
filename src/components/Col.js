import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { percentage, getCssWithMedia } from '../helpers';

const Col = styled.div(
  css`
    flex: 1 1 auto;
    box-sizing: border-box;
  `,
  (props) => {
    const { width, offset, order } = props;
    const styles = css`
      display: ${(gridSetting, breakpointKey) => width && width[breakpointKey] === 0 ? 'none' : 'block'};
      flex-basis: ${(gridSetting, breakpointKey) => width ? percentage(width[breakpointKey]) : ''};
      order: ${(gridSetting, breakpointKey) => order ? order[breakpointKey] : ''};
      margin-left: ${(gridSetting, breakpointKey) => offset ? percentage(offset[breakpointKey]) : ''};
      /* in order to fix float overflow when margin-left is negative */
      margin-right: ${(gridSetting, breakpointKey) => offset && offset[breakpointKey] < 0 ? percentage(offset[breakpointKey]) : ''};
      max-width: ${(gridSetting, breakpointKey) => width ? percentage(width[breakpointKey]) : ''};
    `;
    return getCssWithMedia(props, styles);
  }
);

Col.propTypes = {
  width: PropTypes.oneOfType([PropTypes.objectOf(PropTypes.number), PropTypes.arrayOf(PropTypes.number)]),
  offset: PropTypes.oneOfType([PropTypes.objectOf(PropTypes.number), PropTypes.arrayOf(PropTypes.number)]),
  order: PropTypes.oneOfType([PropTypes.objectOf(PropTypes.number), PropTypes.arrayOf(PropTypes.number)]),
};

export default Col;
