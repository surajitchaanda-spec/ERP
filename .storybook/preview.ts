import type { Preview } from '@storybook/react';
import { tokens } from '@shared-ui/theme/tokens';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import React from 'react';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: ${tokens.typography.fontFamily};
    background-color: ${tokens.colors.neutral[100]};
  }
`;

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={tokens}>
        <GlobalStyle />
        <Story />
      </ThemeProvider>
    )
  ]
};

export default preview;
