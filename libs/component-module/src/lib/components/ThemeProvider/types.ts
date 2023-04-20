import { colors } from './themeConfig';

export type ColorsObject = typeof colors;

/**
 * Add custom colors to the Theme using module augmentation.
 * REF: https://mui.com/customization/palette/#adding-new-colors
 */
declare module '@mui/material/styles' {
  interface Theme {
    custom: CustomVariables;
  }

  interface ThemeOptions {
    custom: CustomVariables;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Palette extends ColorsObject {}
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface PaletteOptions extends ColorsObject {}
}

// Theme custom variables, REF: https://mui.com/customization/theming/#custom-variables
export type CustomVariables = {
  iconUnderlayMargin: number;
};
