import { defineSemanticTokens } from '@chakra-ui/react';

// Bumped up radii for a bubbly, approachable amusement park feel
export const radii = defineSemanticTokens.radii({
  l1: {
    value: '{radii.sm}',
  },
  l2: {
    value: '{radii.md}',
  },
  l3: {
    value: '{radii.lg}',
  },
});
