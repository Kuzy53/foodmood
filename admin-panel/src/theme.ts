import {createTheme, rem, Stepper} from '@mantine/core';

export const theme = createTheme({
  /** Put your mantine theme override here */
  colors: {
    'pink': ['#FDE3E3','#FDE3E3','#FDE3E3','#FDE3E3','#FDE3E3','#FDE3E3','#FDE3E3','#FDE3E3','#FDE3E3','#FDE3E3'],
    'green': ['#DEF7F0','#DEF7F0','#DEF7F0','#DEF7F0','#DEF7F0','#DEF7F0','#DEF7F0','#DEF7F0','#DEF7F0','#DEF7F0'],
    'primary': ['#A7C944', '#A7C944','#A7C944','#A7C944','#A7C944','#A7C944','#A7C944','#A7C944','#A7C944', '#A7C944']
  },
  primaryColor: 'primary',
  fontFamily: 'Inter, sans-serif',
  headings: {
    sizes: {
      h1: {
        fontWeight: '600',
        fontSize: rem(44),
        lineHeight: '1.23',
      },
      h2: {
        fontWeight: '600',
        fontSize: rem(32),
        lineHeight: '1.3',
      }
    }
  },
  components: {
    Badge: {
      defaultProps: {
        size: 'lg',
        radius: 'xl',
      },
      styles: {
        label: { color: '#25262B', fontWeight: 600, textTransform: 'initial' },
        inner: { fontSize: 20 },
      },
    },
    Button: {
      defaultProps: {
        size: 'md',
        radius: 'md',
      },
    },
    MultiSelect: {
      defaultProps: {
        size: 'md',
        radius: 'md',
      }
    },
    TextInput: {
      defaultProps: {
        size: 'md',
        radius: 'md',
      }
    },
    Select: {
      defaultProps: {
        size: 'md',
        radius: 'md',
      }
    },
  }
});
