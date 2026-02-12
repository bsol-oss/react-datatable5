import { defineTokens } from '@chakra-ui/react';

// Slightly heavier defaults — playful type needs more weight to pop
export const fontWeights = defineTokens.fontWeights({
  thin: {
    value: '200',
  },
  extralight: {
    value: '300',
  },
  light: {
    value: '400',
  },
  normal: {
    value: '500',
  },
  medium: {
    value: '600',
  },
  semibold: {
    value: '700',
  },
  bold: {
    value: '800',
  },
  extrabold: {
    value: '900',
  },
  black: {
    value: '900',
  },
});
