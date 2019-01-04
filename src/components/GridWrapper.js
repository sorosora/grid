import styled from 'styled-components';
import { media } from '../helpers/breakpoints';
import { wrapperPadding, wrapperGridWidth } from '../helpers/defaultValue';

const GridWrapper = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  padding-left: ${({ padding: [desktop = wrapperPadding] = [] }) => desktop};
  padding-right: ${({ padding: [desktop = wrapperPadding] = [] }) => desktop};
  max-width: ${({ gridWidth: [desktop = wrapperGridWidth] = [] }) => desktop};
  /* set width small than max-width */
  width: 100%;
  
  ${media.tablet} {
    padding-left: ${({ padding: [, tablet = ''] = [] }) => tablet}; 
    padding-right: ${({ padding: [, tablet = ''] = [] }) => tablet};
    max-width: ${({ gridWidth: [, tablet = ''] = [] }) => tablet};
  }
  
  ${media.phone} {
    padding-left: ${({ padding: [, , phone = ''] = [] }) => phone};
    padding-right: ${({ padding: [, , phone = ''] = [] }) => phone};
    max-width: ${({ gridWidth: [, , phone = ''] = [] }) => phone};
  }
`;

export default GridWrapper;
