import { defineTokens } from '@chakra-ui/react';

export const colors = defineTokens.colors({
  transparent: {
    value: 'transparent',
  },
  current: {
    value: 'currentColor',
  },
  black: {
    value: '#1A0A2E',
  },
  white: {
    value: '#FFFDF7',
  },
  whiteAlpha: {
    '50': {
      value: 'rgba(255, 253, 247, 0.04)',
    },
    '100': {
      value: 'rgba(255, 253, 247, 0.06)',
    },
    '200': {
      value: 'rgba(255, 253, 247, 0.08)',
    },
    '300': {
      value: 'rgba(255, 253, 247, 0.16)',
    },
    '400': {
      value: 'rgba(255, 253, 247, 0.24)',
    },
    '500': {
      value: 'rgba(255, 253, 247, 0.36)',
    },
    '600': {
      value: 'rgba(255, 253, 247, 0.48)',
    },
    '700': {
      value: 'rgba(255, 253, 247, 0.64)',
    },
    '800': {
      value: 'rgba(255, 253, 247, 0.80)',
    },
    '900': {
      value: 'rgba(255, 253, 247, 0.92)',
    },
    '950': {
      value: 'rgba(255, 253, 247, 0.95)',
    },
  },
  blackAlpha: {
    '50': {
      value: 'rgba(26, 10, 46, 0.04)',
    },
    '100': {
      value: 'rgba(26, 10, 46, 0.06)',
    },
    '200': {
      value: 'rgba(26, 10, 46, 0.08)',
    },
    '300': {
      value: 'rgba(26, 10, 46, 0.16)',
    },
    '400': {
      value: 'rgba(26, 10, 46, 0.24)',
    },
    '500': {
      value: 'rgba(26, 10, 46, 0.36)',
    },
    '600': {
      value: 'rgba(26, 10, 46, 0.48)',
    },
    '700': {
      value: 'rgba(26, 10, 46, 0.64)',
    },
    '800': {
      value: 'rgba(26, 10, 46, 0.80)',
    },
    '900': {
      value: 'rgba(26, 10, 46, 0.92)',
    },
    '950': {
      value: 'rgba(26, 10, 46, 0.95)',
    },
  },
  // Warm gray with a slight purple undertone (like twilight at the park)
  gray: {
    '50': {
      value: '#FBF8FC',
    },
    '100': {
      value: '#F3EEF6',
    },
    '200': {
      value: '#E8E0ED',
    },
    '300': {
      value: '#D5C9DD',
    },
    '400': {
      value: '#A99AB5',
    },
    '500': {
      value: '#7D6E8A',
    },
    '600': {
      value: '#5E4F6B',
    },
    '700': {
      value: '#463854',
    },
    '800': {
      value: '#2E2240',
    },
    '900': {
      value: '#1E1430',
    },
    '950': {
      value: '#140C22',
    },
  },
  // Carnival Red - bold circus tent red
  red: {
    '50': {
      value: '#FFF1F0',
    },
    '100': {
      value: '#FFD9D6',
    },
    '200': {
      value: '#FFB3AD',
    },
    '300': {
      value: '#FF7F75',
    },
    '400': {
      value: '#FF4D40',
    },
    '500': {
      value: '#E8271A',
    },
    '600': {
      value: '#CC1508',
    },
    '700': {
      value: '#990F06',
    },
    '800': {
      value: '#5C0904',
    },
    '900': {
      value: '#380502',
    },
    '950': {
      value: '#220301',
    },
  },
  // Sunset Orange - warm golden sunset over the park
  orange: {
    '50': {
      value: '#FFF5E6',
    },
    '100': {
      value: '#FFE6BF',
    },
    '200': {
      value: '#FFD08A',
    },
    '300': {
      value: '#FFB547',
    },
    '400': {
      value: '#FF9A14',
    },
    '500': {
      value: '#F08000',
    },
    '600': {
      value: '#D46A00',
    },
    '700': {
      value: '#8C4700',
    },
    '800': {
      value: '#663400',
    },
    '900': {
      value: '#3D1F00',
    },
    '950': {
      value: '#241200',
    },
  },
  // Sunshine Yellow - ferris wheel lights and popcorn stands
  yellow: {
    '50': {
      value: '#FFFBE5',
    },
    '100': {
      value: '#FFF4B8',
    },
    '200': {
      value: '#FFEC7A',
    },
    '300': {
      value: '#FFE033',
    },
    '400': {
      value: '#FFD500',
    },
    '500': {
      value: '#E6BF00',
    },
    '600': {
      value: '#C4A300',
    },
    '700': {
      value: '#8A7300',
    },
    '800': {
      value: '#6B5900',
    },
    '900': {
      value: '#3D3300',
    },
    '950': {
      value: '#261F00',
    },
  },
  // Funpark Green - lush park foliage and go-kart tracks
  green: {
    '50': {
      value: '#EEFCE5',
    },
    '100': {
      value: '#D4F9BF',
    },
    '200': {
      value: '#ADF28A',
    },
    '300': {
      value: '#7DE847',
    },
    '400': {
      value: '#52D919',
    },
    '500': {
      value: '#3BBF0A',
    },
    '600': {
      value: '#2D9908',
    },
    '700': {
      value: '#1F6B05',
    },
    '800': {
      value: '#164D04',
    },
    '900': {
      value: '#0C2E02',
    },
    '950': {
      value: '#071C01',
    },
  },
  // Splash Teal - water rides and splash zones
  teal: {
    '50': {
      value: '#E5FEF9',
    },
    '100': {
      value: '#B8FCF0',
    },
    '200': {
      value: '#7AF8E2',
    },
    '300': {
      value: '#33F0CE',
    },
    '400': {
      value: '#00E0B8',
    },
    '500': {
      value: '#00C4A0',
    },
    '600': {
      value: '#009E82',
    },
    '700': {
      value: '#006B58',
    },
    '800': {
      value: '#004D3F',
    },
    '900': {
      value: '#002E26',
    },
    '950': {
      value: '#001C17',
    },
  },
  // Neon Blue - bright neon signs and night rides
  blue: {
    '50': {
      value: '#E8F1FF',
    },
    '100': {
      value: '#CCDEFF',
    },
    '200': {
      value: '#99BBFF',
    },
    '300': {
      value: '#6699FF',
    },
    '400': {
      value: '#3377FF',
    },
    '500': {
      value: '#0055FF',
    },
    '600': {
      value: '#0044CC',
    },
    '700': {
      value: '#003199',
    },
    '800': {
      value: '#002266',
    },
    '900': {
      value: '#001444',
    },
    '950': {
      value: '#000D2E',
    },
  },
  // Electric Cyan - arcade lights and bumper cars
  cyan: {
    '50': {
      value: '#E5FBFF',
    },
    '100': {
      value: '#BFF5FF',
    },
    '200': {
      value: '#80EBFF',
    },
    '300': {
      value: '#33DFFF',
    },
    '400': {
      value: '#00D4FF',
    },
    '500': {
      value: '#00B8E0',
    },
    '600': {
      value: '#0095B8',
    },
    '700': {
      value: '#006680',
    },
    '800': {
      value: '#004A5C',
    },
    '900': {
      value: '#002C38',
    },
    '950': {
      value: '#001A24',
    },
  },
  // Magic Purple - enchanted castle and night parade
  purple: {
    '50': {
      value: '#F5EEFF',
    },
    '100': {
      value: '#E8D6FF',
    },
    '200': {
      value: '#D1ADFF',
    },
    '300': {
      value: '#B580FF',
    },
    '400': {
      value: '#9B52FF',
    },
    '500': {
      value: '#8224FF',
    },
    '600': {
      value: '#6B00EB',
    },
    '700': {
      value: '#4E00AD',
    },
    '800': {
      value: '#370078',
    },
    '900': {
      value: '#210047',
    },
    '950': {
      value: '#14002E',
    },
  },
  // Cotton Candy Pink - soft and sweet like the treat
  pink: {
    '50': {
      value: '#FFF0F7',
    },
    '100': {
      value: '#FFD6EB',
    },
    '200': {
      value: '#FFB3DA',
    },
    '300': {
      value: '#FF80C2',
    },
    '400': {
      value: '#FF4DA8',
    },
    '500': {
      value: '#F0198C',
    },
    '600': {
      value: '#CC0070',
    },
    '700': {
      value: '#990054',
    },
    '800': {
      value: '#66003A',
    },
    '900': {
      value: '#3D0022',
    },
    '950': {
      value: '#260015',
    },
  },
});
