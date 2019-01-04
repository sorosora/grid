import { createBreakpoints } from '@sorosora/styled-breakpoints';
import { breakpoints } from './defaultValue';

const { max } = createBreakpoints(breakpoints);

const media = {
  tablet: max('tablet'),
  phone: max('phone'),
};

export { media };
