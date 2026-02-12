import { defineTokens } from '@chakra-ui/react';

// More generous spacing — rounded fonts breathe better with extra room
export const letterSpacings = defineTokens.letterSpacings({
  tighter: {
    value: '-0.03em',
  },
  tight: {
    value: '-0.015em',
  },
  wide: {
    value: '0.035em',
  },
  wider: {
    value: '0.065em',
  },
  widest: {
    value: '0.12em',
  },
});
