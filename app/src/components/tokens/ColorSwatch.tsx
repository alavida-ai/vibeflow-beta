import { Badge } from "@/components/ui/badge"
import type { ColorToken } from "@/lib/token-reader"

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
