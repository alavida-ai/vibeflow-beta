/**
 * Token Display Components
 * Visual components for displaying design tokens in the tokens page
 */

import { Badge } from "@/components/ui/badge"
import type {
  ColorToken,
  TypographyToken,
  FontWeightToken,
  LineHeightToken,
  SpacingToken,
  RadiusToken
} from "@/lib/token-reader"

// ============================================================================
// COLOR COMPONENTS
// ============================================================================

interface ColorSwatchProps {
  token: ColorToken
  showCssVar?: boolean
}

export function ColorSwatch({ token, showCssVar = false }: ColorSwatchProps) {
  return (
    <div className="space-y-2">
      <div
        className="h-16 rounded-lg border shadow-sm transition-transform hover:scale-105"
        style={{ backgroundColor: token.value }}
      />
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium">{token.name}</p>
          <Badge variant="outline" className="text-xs font-mono">
            {token.value}
          </Badge>
        </div>
        {showCssVar && (
          <code className="text-xs text-muted-foreground block">
            {token.cssVar}
          </code>
        )}
      </div>
    </div>
  )
}

interface ColorPaletteProps {
  title: string
  tokens: ColorToken[]
  description?: string
  showCssVars?: boolean
}

export function ColorPalette({ title, tokens, description, showCssVars = false }: ColorPaletteProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">{title}</h3>
        <Badge variant="secondary" className="text-xs">
          {tokens.length} {tokens.length === 1 ? 'color' : 'colors'}
        </Badge>
      </div>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {tokens.map((token) => (
          <ColorSwatch key={token.name} token={token} showCssVar={showCssVars} />
        ))}
      </div>
    </div>
  )
}

// ============================================================================
// TYPOGRAPHY COMPONENTS
// ============================================================================

interface TypeScaleProps {
  token: TypographyToken
  sampleText?: string
  showCssVar?: boolean
}

export function TypeScale({
  token,
  sampleText = "The quick brown fox jumps over the lazy dog",
  showCssVar = false
}: TypeScaleProps) {
  return (
    <div className="flex items-baseline gap-4 pb-3 border-b last:border-0">
      <Badge variant="outline" className="text-xs shrink-0 w-16 justify-center font-mono">
        {token.name}
      </Badge>
      <div className="flex-1 min-w-0 space-y-1">
        <p style={{ fontSize: token.value }} className="font-medium truncate">
          {sampleText}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-mono">{token.value}</span>
          {showCssVar && (
            <span className="font-mono text-muted-foreground/70">{token.cssVar}</span>
          )}
        </div>
      </div>
    </div>
  )
}

interface TypeScaleListProps {
  tokens: TypographyToken[]
  sampleText?: string
  showCssVars?: boolean
}

export function TypeScaleList({ tokens, sampleText, showCssVars = false }: TypeScaleListProps) {
  return (
    <div className="rounded-lg border p-4 bg-muted/30 space-y-3">
      {tokens.map((token) => (
        <TypeScale
          key={token.name}
          token={token}
          sampleText={sampleText}
          showCssVar={showCssVars}
        />
      ))}
    </div>
  )
}

interface FontFamilyDisplayProps {
  token: TypographyToken
  sampleText?: string
}

export function FontFamilyDisplay({
  token,
  sampleText = "The quick brown fox jumps over the lazy dog"
}: FontFamilyDisplayProps) {
  return (
    <div className="rounded-lg border p-4 bg-muted/30 space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{token.name}</p>
        <Badge variant="outline" className="text-xs font-mono">
          {token.cssVar}
        </Badge>
      </div>
      <p
        className="text-lg"
        style={{ fontFamily: token.value }}
      >
        {sampleText}
      </p>
      <code className="text-xs text-muted-foreground block">
        {token.value}
      </code>
    </div>
  )
}

interface FontWeightDisplayProps {
  tokens: FontWeightToken[]
  sampleText?: string
}

export function FontWeightDisplay({
  tokens,
  sampleText = "The quick brown fox jumps"
}: FontWeightDisplayProps) {
  return (
    <div className="rounded-lg border p-4 bg-muted/30 space-y-3">
      {tokens.map((token) => (
        <div key={token.name} className="flex items-center gap-4 pb-3 border-b last:border-0">
          <Badge variant="outline" className="text-xs shrink-0 w-20 justify-center">
            {token.name}
          </Badge>
          <p
            className="text-base flex-1"
            style={{ fontWeight: token.value }}
          >
            {sampleText}
          </p>
          <span className="text-xs text-muted-foreground font-mono shrink-0">
            {token.value}
          </span>
        </div>
      ))}
    </div>
  )
}

interface LineHeightDisplayProps {
  tokens: LineHeightToken[]
}

export function LineHeightDisplay({ tokens }: LineHeightDisplayProps) {
  const sampleText = "Design tokens are the visual design atoms of the design system. They are named entities that store visual design attributes."

  return (
    <div className="rounded-lg border p-4 bg-muted/30 space-y-4">
      {tokens.map((token) => (
        <div key={token.name} className="space-y-2 pb-4 border-b last:border-0">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {token.name}
            </Badge>
            <span className="text-xs text-muted-foreground font-mono">
              {token.value}
            </span>
          </div>
          <p
            className="text-sm text-muted-foreground"
            style={{ lineHeight: token.value }}
          >
            {sampleText}
          </p>
        </div>
      ))}
    </div>
  )
}

// ============================================================================
// SPACING COMPONENTS
// ============================================================================

interface SpacingScaleProps {
  token: SpacingToken
  showCssVar?: boolean
}

export function SpacingScale({ token, showCssVar = false }: SpacingScaleProps) {
  // Convert rem to px for display (assuming 1rem = 16px)
  const remValue = parseFloat(token.value)
  const pxValue = Math.round(remValue * 16)

  return (
    <div className="flex items-center gap-4 pb-3 border-b last:border-0">
      <Badge variant="outline" className="text-xs shrink-0 w-12 justify-center font-mono">
        {token.name}
      </Badge>
      <div
        className="bg-primary/80 rounded transition-all hover:bg-primary"
        style={{ height: "1.5rem", width: token.value }}
      />
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="font-mono">{token.value}</span>
        <span className="text-muted-foreground/70">({pxValue}px)</span>
        {showCssVar && (
          <span className="font-mono text-xs text-muted-foreground/70">{token.cssVar}</span>
        )}
      </div>
    </div>
  )
}

interface SpacingScaleListProps {
  tokens: SpacingToken[]
  showCssVars?: boolean
}

export function SpacingScaleList({ tokens, showCssVars = false }: SpacingScaleListProps) {
  return (
    <div className="rounded-lg border p-4 bg-muted/30 space-y-3">
      {tokens.map((token) => (
        <SpacingScale key={token.name} token={token} showCssVar={showCssVars} />
      ))}
    </div>
  )
}

// ============================================================================
// RADIUS COMPONENTS
// ============================================================================

interface RadiusScaleProps {
  token: RadiusToken
  showCssVar?: boolean
}

export function RadiusScale({ token, showCssVar = false }: RadiusScaleProps) {
  return (
    <div className="space-y-2">
      <div
        className="h-20 w-20 bg-primary/80 border-2 border-primary transition-all hover:bg-primary"
        style={{ borderRadius: token.value }}
      />
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium">{token.name}</p>
          <Badge variant="outline" className="text-xs font-mono">
            {token.value === '9999px' ? 'full' : token.value}
          </Badge>
        </div>
        {showCssVar && (
          <code className="text-xs text-muted-foreground block">
            {token.cssVar}
          </code>
        )}
      </div>
    </div>
  )
}

interface RadiusScaleListProps {
  tokens: RadiusToken[]
  showCssVars?: boolean
}

export function RadiusScaleList({ tokens, showCssVars = false }: RadiusScaleListProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {tokens.map((token) => (
        <RadiusScale key={token.name} token={token} showCssVar={showCssVars} />
      ))}
    </div>
  )
}
