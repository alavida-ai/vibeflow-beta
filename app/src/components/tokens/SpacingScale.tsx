import { Badge } from "@/components/ui/badge"
import type { SpacingToken, RadiusToken } from "@/lib/token-reader"

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
