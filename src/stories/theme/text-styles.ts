import { defineTextStyles } from '@chakra-ui/react';

// Text styles with roomier line heights matching the bumped-up font sizes
export const textStyles = defineTextStyles({
  '2xs': {
    value: {
      fontSize: '2xs',
      lineHeight: '0.875rem',
    },
  },
  xs: {
    value: {
      fontSize: 'xs',
      lineHeight: '1.125rem',
    },
  },
  sm: {
    value: {
      fontSize: 'sm',
      lineHeight: '1.375rem',
    },
  },
  md: {
    value: {
      fontSize: 'md',
      lineHeight: '1.625rem',
    },
  },
  lg: {
    value: {
      fontSize: 'lg',
      lineHeight: '1.875rem',
    },
  },
  xl: {
    value: {
      fontSize: 'xl',
      lineHeight: '2rem',
    },
  },
  '2xl': {
    value: {
      fontSize: '2xl',
      lineHeight: '2.25rem',
    },
  },
  '3xl': {
    value: {
      fontSize: '3xl',
      lineHeight: '2.625rem',
    },
  },
  '4xl': {
    value: {
      fontSize: '4xl',
      lineHeight: '3rem',
      letterSpacing: '-0.015em',
    },
  },
  '5xl': {
    value: {
      fontSize: '5xl',
      lineHeight: '4rem',
      letterSpacing: '-0.015em',
    },
  },
  '6xl': {
    value: {
      fontSize: '6xl',
      lineHeight: '4.875rem',
      letterSpacing: '-0.015em',
    },
  },
  '7xl': {
    value: {
      fontSize: '7xl',
      lineHeight: '6.125rem',
      letterSpacing: '-0.015em',
    },
  },
  none: {
    value: {},
  },
});
