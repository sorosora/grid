import styled from 'styled-components';
import { media } from '../helpers/breakpoints';
import { percentage } from '../helpers';

const Col = styled.div`
  display: ${({ width: [desktop] = [] }) => (desktop === 0 ? 'none' : 'block')};
  flex: 1 1;
  flex-basis: ${({ width: [desktop] = [] }) => percentage(desktop)};
  order: ${({ order: [desktop] = [] }) => desktop};
  margin-left: ${({ offset: [desktop] = [] }) => percentage(desktop)};
  /* in order to fix float overflow when margin-left is negative */
  margin-right: ${({ offset: [desktop] = [] }) => (desktop < 0 ? percentage(desktop) : '')};
  max-width: ${({ width: [desktop] = [] }) => percentage(desktop)};
  font-size: 0;
  
  ${media.tablet} {
    display: ${({ width: [, tablet] = [] }) => (tablet === 0 ? 'none' : 'block')};
    flex-basis: ${({ width: [, tablet] = [] }) => percentage(tablet)};
    order: ${({ order: [, tablet] = [] }) => tablet};
    margin-left: ${({ offset: [, tablet] = [] }) => percentage(tablet)};
    margin-right: ${({ offset: [, tablet] = [] }) => (tablet < 0 ? percentage(tablet) : '')};
    max-width: ${({ width: [, tablet] = [] }) => percentage(tablet)};
  }
  
  ${media.phone} {
    display: ${({ width: [, , phone] = [] }) => (phone === 0 ? 'none' : 'block')};
    flex-basis: ${({ width: [, , phone] = [] }) => percentage(phone)};
    order: ${({ order: [, , phone] = [] }) => phone};
    margin-left: ${({ offset: [, , phone] = [] }) => percentage(phone)};
    margin-right: ${({ offset: [, , phone] = [] }) => (phone < 0 ? percentage(phone) : '')};
    max-width: ${({ width: [, , phone] = [] }) => percentage(phone)};
  }
`;

export default Col;
