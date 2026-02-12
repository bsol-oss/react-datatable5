import { defineSemanticTokens } from '@chakra-ui/react';

// Warm, slightly colorful shadows — like soft neon glow at an amusement park
export const shadows = defineSemanticTokens.shadows({
  xs: {
    value: {
      _light:
        '0px 1px 2px {colors.purple.900/8}, 0px 0px 1px {colors.purple.900/16}',
      _dark: '0px 1px 1px {black/64}, 0px 0px 1px inset {colors.purple.300/16}',
    },
  },
  sm: {
    value: {
      _light:
        '0px 2px 4px {colors.purple.900/8}, 0px 0px 1px {colors.purple.900/20}',
      _dark: '0px 2px 4px {black/64}, 0px 0px 1px inset {colors.purple.300/20}',
    },
  },
  md: {
    value: {
      _light:
        '0px 4px 8px {colors.purple.900/8}, 0px 0px 1px {colors.purple.900/20}',
      _dark: '0px 4px 8px {black/64}, 0px 0px 1px inset {colors.purple.300/20}',
    },
  },
  lg: {
    value: {
      _light:
        '0px 8px 16px {colors.purple.900/8}, 0px 0px 1px {colors.purple.900/20}',
      _dark:
        '0px 8px 16px {black/64}, 0px 0px 1px inset {colors.purple.300/20}',
    },
  },
  xl: {
    value: {
      _light:
        '0px 16px 24px {colors.purple.900/10}, 0px 0px 1px {colors.purple.900/24}',
      _dark:
        '0px 16px 24px {black/64}, 0px 0px 1px inset {colors.purple.300/24}',
    },
  },
  '2xl': {
    value: {
      _light:
        '0px 24px 40px {colors.purple.900/12}, 0px 0px 1px {colors.purple.900/24}',
      _dark:
        '0px 24px 40px {black/64}, 0px 0px 1px inset {colors.purple.300/24}',
    },
  },
  inner: {
    value: {
      _light: 'inset 0 2px 4px 0 {colors.purple.900/5}',
      _dark: 'inset 0 2px 4px 0 black',
    },
  },
  inset: {
    value: {
      _light: 'inset 0 0 0 1px {colors.purple.900/5}',
      _dark: 'inset 0 0 0 1px {colors.purple.300/5}',
    },
  },
});
