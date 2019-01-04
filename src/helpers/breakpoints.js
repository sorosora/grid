import { createBreakpoints } from '@sorosora/styled-breakpoints';

const defaultBreakpoints = {
  desktop: 1200,
  tablet: 768,
  phone: 0,
};

const { max } = createBreakpoints(defaultBreakpoints);

const media = {
  tablet: max('tablet'),
  phone: max('phone'),
};

export { media };
