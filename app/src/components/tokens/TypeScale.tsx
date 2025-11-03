import { Badge } from "@/components/ui/badge"
import type { TypographyToken, FontWeightToken, LineHeightToken } from "@/lib/token-reader"

interface TypeScaleProps {
  token: TypographyToken
  sampleText?: string
  showCssVar?: boolean
}

export function TypeScale({ token, sampleText = "The quick brown fox jumps over the lazy dog", showCssVar = false }: TypeScaleProps) {
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

export function FontFamilyDisplay({ token, sampleText = "The quick brown fox jumps over the lazy dog" }: FontFamilyDisplayProps) {
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

export function FontWeightDisplay({ tokens, sampleText = "The quick brown fox jumps" }: FontWeightDisplayProps) {
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
