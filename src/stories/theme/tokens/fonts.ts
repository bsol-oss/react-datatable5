import { defineTokens } from '@chakra-ui/react';

// Playful, rounded typefaces — bubbly headings, friendly body text
export const fonts = defineTokens.fonts({
  heading: {
    value:
      'Fredoka, "Baloo 2", Nunito, "Comic Sans MS", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  },
  body: {
    value:
      '"Comic Sans MS", Nunito, Quicksand, "Baloo 2", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  },
  mono: {
    value:
      '"Victor Mono", "Fira Code", "JetBrains Mono", SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
});
