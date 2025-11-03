import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Palette, Type, Ruler, Circle, Info } from "lucide-react"
import type { Metadata } from "next"
import { getAllTokens } from "@/lib/token-reader"
import { ColorPalette } from "@/components/tokens/ColorSwatch"
import { TypeScaleList, FontFamilyDisplay, FontWeightDisplay, LineHeightDisplay } from "@/components/tokens/TypeScale"
import { SpacingScaleList, RadiusScaleList } from "@/components/tokens/SpacingScale"

export const metadata: Metadata = {
  title: "Design Tokens - Vibeflow Design System",
  description: "Color, typography, and spacing tokens from our design system",
}

export default function TokensPage() {
  // Load all tokens from the design system
  const tokens = getAllTokens()

  return (
    <div className="flex min-h-full flex-1 flex-col gap-6 p-6 md:p-8 lg:p-10">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-bold tracking-tight">Design Tokens</h1>
          <Badge variant="outline">Foundation</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Color, typography, and spacing tokens from our design system
        </p>
      </div>

      {/* Info Banner */}
      <Card className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/20">
        <CardContent className="flex items-start gap-3 pt-6">
          <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
              Tokens are loaded from design system configuration
            </p>
            <code className="text-xs text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">
              /brand/strategy/design/build/tokens.json
            </code>
          </div>
        </CardContent>
      </Card>

      {/* Colors Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary/10 p-2">
              <Palette className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Color Tokens</CardTitle>
              <CardDescription>Semantic and primitive color scales</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Brand Colors */}
          {tokens.colors.brand.length > 0 && (
            <>
              <ColorPalette
                title="Brand Colors"
                tokens={tokens.colors.brand}
                description="Primary brand colors used for primary actions, links, and emphasis."
                showCssVars
              />
              <Separator />
            </>
          )}

          {/* Neutral Colors */}
          {tokens.colors.neutral.length > 0 && (
            <>
              <ColorPalette
                title="Neutral Colors"
                tokens={tokens.colors.neutral}
                description="Neutral grays used for backgrounds, borders, and text."
                showCssVars
              />
              <Separator />
            </>
          )}

          {/* Semantic Colors */}
          {tokens.colors.semantic.length > 0 && (
            <ColorPalette
              title="Semantic Colors"
              tokens={tokens.colors.semantic}
              description="Colors with specific semantic meaning for feedback and states."
              showCssVars
            />
          )}
        </CardContent>
      </Card>

      {/* Typography Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary/10 p-2">
              <Type className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Typography Tokens</CardTitle>
              <CardDescription>Font families, sizes, weights, and line heights</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Font Families */}
          {tokens.typography.fontFamilies.length > 0 && (
            <>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Font Families</h3>
                  <Badge variant="secondary" className="text-xs">
                    {tokens.typography.fontFamilies.length} {tokens.typography.fontFamilies.length === 1 ? 'family' : 'families'}
                  </Badge>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {tokens.typography.fontFamilies.map((token) => (
                    <FontFamilyDisplay key={token.name} token={token} />
                  ))}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Font Sizes */}
          {tokens.typography.fontSizes.length > 0 && (
            <>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Type Scale</h3>
                  <Badge variant="secondary" className="text-xs">
                    {tokens.typography.fontSizes.length} sizes
                  </Badge>
                </div>
                <TypeScaleList tokens={tokens.typography.fontSizes} showCssVars />
              </div>
              <Separator />
            </>
          )}

          {/* Font Weights */}
          {tokens.typography.fontWeights.length > 0 && (
            <>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Font Weights</h3>
                  <Badge variant="secondary" className="text-xs">
                    {tokens.typography.fontWeights.length} weights
                  </Badge>
                </div>
                <FontWeightDisplay tokens={tokens.typography.fontWeights} />
              </div>
              <Separator />
            </>
          )}

          {/* Line Heights */}
          {tokens.typography.lineHeights.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Line Heights</h3>
                <Badge variant="secondary" className="text-xs">
                  {tokens.typography.lineHeights.length} heights
                </Badge>
              </div>
              <LineHeightDisplay tokens={tokens.typography.lineHeights} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Spacing Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary/10 p-2">
              <Ruler className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Spacing Tokens</CardTitle>
              <CardDescription>Consistent spacing and sizing scale</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {tokens.spacing.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Spacing Scale</h3>
                <Badge variant="secondary" className="text-xs">
                  {tokens.spacing.length} values
                </Badge>
              </div>
              <SpacingScaleList tokens={tokens.spacing} showCssVars />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Radius Section */}
      {tokens.radius.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Circle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Border Radius Tokens</CardTitle>
                <CardDescription>Corner radius values for rounded elements</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Radius Scale</h3>
                <Badge variant="secondary" className="text-xs">
                  {tokens.radius.length} values
                </Badge>
              </div>
              <div className="rounded-lg border p-4 bg-muted/30">
                <RadiusScaleList tokens={tokens.radius} showCssVars />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
