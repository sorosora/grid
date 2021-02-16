import { createBreakpoints } from '@sorosora/styled-breakpoints';

const breakpointsToArray = (breakpoints, mobileFirst = false) => {
  const result = Object.keys(breakpoints).map(key => ({
    name: key,
    value: breakpoints[key],
  }));
  result.sort((a, b) =>
    (parseInt(b.value, 10) - parseInt(a.value, 10))
    * mobileFirst ? -1 : 1);
  return result;
};

const media = {
  tablet: max('tablet'),
  phone: max('phone'),
};

function Breakpoint(breakpoints, mobileFirst = false) {
  const { max } = createBreakpoints(breakpoints);
  breakpointsArray = breakpointsToArray(breakpoints);
}

export { media };
