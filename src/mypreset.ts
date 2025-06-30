import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

const MyPreset = definePreset(Aura, {
  //Your customizations, see the following sections for examples
  semantic: {
    primary: {
      50: '#8E73E8',
      100: '#8D72E8',
      200: '#8A6FE6',
      300: '#866BE3',
      400: '#7E61DF',
      500: '#7A5EDD',
      600: '#7558DA',
      700: '#6C50D3',
      800: '#6448CE',
      900: '#5E42CA',
      950: '#5B3FC8',
      1000: 'linear-gradient(40deg,var(--p-primary-900) 0%,var(--p-primary-50) 100%)'
    },
    colorScheme: {
      light: {
        formField: {
          background: 'transparent',
          borderColor: '0',
          shadow: '0',
          borderRadius: '0',
        }
      },
      dark: {
        formField: {
          background: 'transparent',
          borderColor: '0',
          shadow: '0',
          borderRadius: '0',
        }
      }
    }
  },
});

export default MyPreset;
