import type { Story as StoryType } from '@storybook/react';

import { ThemeProvider } from '../ThemeProvider';

export const ThemeDecorator = (Story: StoryType) => {
  return (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  );
};
