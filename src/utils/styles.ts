import { theme } from "@/styles/theme";

export type AppTheme = typeof theme;

// CSSプロパティ判定用
const ColorThemeProps = new Set(["color", "background-color"]);
const SpaceThemeProps = new Set([
  "padding",
  "padding-top",
  "padding-right",
  "padding-bottom",
  "padding-right",
  "margin",
  "margin-top",
  "margin-right",
  "margin-bottom",
  "margin-right",
]);
const LetterSpacingThemeProps = new Set(["letter-spacing"]);
const fontSizeThemeProps = new Set(["font-size"]);
const lineHeightThemeProps = new Set(["line-height"]);

// CSS value判定用
type ColorThemeKeys = keyof typeof theme.colors;
type SpaceThemeKeys = keyof typeof theme.spaces;
type LetterSpacingThemeKeys = keyof typeof theme.letterSpacings;
type FontSizeThemeKeys = keyof typeof theme.fontSizes;
type LineHeightThemeKeys = keyof typeof theme.lineHeights;

// 型推論用
export type Color = ColorThemeKeys | (string & {});
export type Space = SpaceThemeKeys | (string & {});
export type LetterSpacing = LetterSpacingThemeKeys | (string & {});
export type FontSize = FontSizeThemeKeys | (string & {});
export type LineHeight = LineHeightThemeKeys | (string & {});

export function themeToValue(props: any, value: any) {
  // CSSのプロパティ名に一致するものがあるか
  // CSSの値に一致するものがあるか
  // なければそのままvalueを返す
  if (ColorThemeProps.has(props) && isColorThemeProps(value, theme)) {
    return theme.colors[value];
  }
  if (SpaceThemeProps.has(props) && isSpaceThemeProps(value, theme)) {
    return theme.spaces[value];
  }
  if (
    LetterSpacingThemeProps.has(props) &&
    isLetterSpacingThemeProps(value, theme)
  ) {
    return theme.letterSpacings[value];
  }
  if (fontSizeThemeProps.has(props) && isFontSizeThemeProps(value, theme)) {
    return theme.fontSizes[value];
  }
  if (lineHeightThemeProps.has(props) && isLineHeightThemeProps(value, theme)) {
    return theme.lineHeights[value];
  }
  return value;
}

function isColorThemeProps(
  props: any,
  theme: AppTheme,
): props is ColorThemeKeys {
  return Object.keys(theme.colors).filter((k) => k == props).length > 0;
}

function isSpaceThemeProps(
  props: any,
  theme: AppTheme,
): props is SpaceThemeKeys {
  return Object.keys(theme.spaces).filter((k) => k == props).length > 0;
}

function isLetterSpacingThemeProps(
  props: any,
  theme: AppTheme,
): props is LetterSpacingThemeKeys {
  return Object.keys(theme.letterSpacings).filter((k) => k == props).length > 0;
}

function isFontSizeThemeProps(
  props: any,
  theme: AppTheme,
): props is FontSizeThemeKeys {
  return Object.keys(theme.fontSizes).filter((k) => k == props).length > 0;
}

function isLineHeightThemeProps(
  props: any,
  theme: AppTheme,
): props is LineHeightThemeKeys {
  return Object.keys(theme.lineHeights).filter((k) => k == props).length > 0;
}
