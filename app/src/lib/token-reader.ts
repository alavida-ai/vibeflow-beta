import { readFileSync } from 'fs'
import { join } from 'path'

// Read tokens from the design system
const tokensPath = join(process.cwd(), '..', 'brand', 'strategy', 'design', 'build', 'tokens.json')
const tokens = JSON.parse(readFileSync(tokensPath, 'utf-8')) as Record<string, string>

// Token type definitions
export interface ColorToken {
  name: string
  value: string
  cssVar: string
}

export interface TypographyToken {
  name: string
  value: string
  cssVar: string
}

export interface SpacingToken {
  name: string
  value: string
  cssVar: string
}

export interface RadiusToken {
  name: string
  value: string
  cssVar: string
}

export interface FontWeightToken {
  name: string
  value: string
  cssVar: string
}

export interface LineHeightToken {
  name: string
  value: string
  cssVar: string
}

// Convert camelCase token names to kebab-case CSS variables
function tokenNameToCssVar(name: string): string {
  return '--' + name
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '')
}

// Parse color tokens
export function getColorTokens(): {
  brand: ColorToken[]
  neutral: ColorToken[]
  semantic: ColorToken[]
} {
  const brand: ColorToken[] = []
  const neutral: ColorToken[] = []
  const semantic: ColorToken[] = []

  Object.entries(tokens).forEach(([key, value]) => {
    if (key.startsWith('ColorBrand')) {
      brand.push({
        name: key.replace('ColorBrand', ''),
        value: value as string,
        cssVar: tokenNameToCssVar(key),
      })
    } else if (key.startsWith('ColorNeutral')) {
      neutral.push({
        name: key.replace('ColorNeutral', ''),
        value: value as string,
        cssVar: tokenNameToCssVar(key),
      })
    } else if (key.startsWith('ColorSemantic')) {
      semantic.push({
        name: key.replace('ColorSemantic', ''),
        value: value as string,
        cssVar: tokenNameToCssVar(key),
      })
    }
  })

  return { brand, neutral, semantic }
}

// Parse typography tokens
export function getTypographyTokens(): {
  fontFamilies: TypographyToken[]
  fontSizes: TypographyToken[]
  fontWeights: FontWeightToken[]
  lineHeights: LineHeightToken[]
} {
  const fontFamilies: TypographyToken[] = []
  const fontSizes: TypographyToken[] = []
  const fontWeights: FontWeightToken[] = []
  const lineHeights: LineHeightToken[] = []

  Object.entries(tokens).forEach(([key, value]) => {
    if (key.startsWith('FontFamily')) {
      fontFamilies.push({
        name: key.replace('FontFamily', ''),
        value: value as string,
        cssVar: tokenNameToCssVar(key),
      })
    } else if (key.startsWith('FontSize')) {
      fontSizes.push({
        name: key.replace('FontSize', ''),
        value: value as string,
        cssVar: tokenNameToCssVar(key),
      })
    } else if (key.startsWith('FontWeight')) {
      fontWeights.push({
        name: key.replace('FontWeight', ''),
        value: value as string,
        cssVar: tokenNameToCssVar(key),
      })
    } else if (key.startsWith('FontLineHeight')) {
      lineHeights.push({
        name: key.replace('FontLineHeight', ''),
        value: value as string,
        cssVar: tokenNameToCssVar(key),
      })
    }
  })

  return { fontFamilies, fontSizes, fontWeights, lineHeights }
}

// Parse spacing tokens
export function getSpacingTokens(): SpacingToken[] {
  const spacing: SpacingToken[] = []

  Object.entries(tokens).forEach(([key, value]) => {
    if (key.startsWith('Spacing')) {
      spacing.push({
        name: key.replace('Spacing', ''),
        value: value as string,
        cssVar: tokenNameToCssVar(key),
      })
    }
  })

  return spacing
}

// Parse radius tokens
export function getRadiusTokens(): RadiusToken[] {
  const radius: RadiusToken[] = []

  Object.entries(tokens).forEach(([key, value]) => {
    if (key.startsWith('Radius')) {
      radius.push({
        name: key.replace('Radius', ''),
        value: value as string,
        cssVar: tokenNameToCssVar(key),
      })
    }
  })

  return radius
}

// Get all tokens
export function getAllTokens() {
  return {
    colors: getColorTokens(),
    typography: getTypographyTokens(),
    spacing: getSpacingTokens(),
    radius: getRadiusTokens(),
  }
}
