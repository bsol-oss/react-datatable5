import { defineTokens } from '@chakra-ui/react';

// More relaxed line heights — friendly, easy to read at a glance
export const lineHeights = defineTokens.lineHeights({
  shorter: {
    value: 1.3,
  },
  short: {
    value: 1.45,
  },
  moderate: {
    value: 1.6,
  },
  tall: {
    value: 1.75,
  },
  taller: {
    value: 2.1,
  },
});
