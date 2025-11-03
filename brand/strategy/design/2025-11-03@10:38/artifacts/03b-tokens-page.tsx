import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Palette, Type, Ruler, Info } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Design Tokens - Vibeflow Design System",
  description: "Color, typography, and spacing tokens from our design system",
}

export default function TokensPage() {
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
          {/* Primary Colors */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Primary Colors</h3>
              <Badge variant="secondary" className="text-xs">8 shades</Badge>
            </div>
            <div className="rounded-lg border p-4 bg-muted/30">
              <p className="text-sm text-muted-foreground mb-3">
                Primary brand colors used for primary actions, links, and emphasis.
              </p>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {[50, 100, 200, 300, 400, 500, 600, 700].map((shade) => (
                  <div key={shade} className="space-y-1">
                    <div
                      className="h-12 rounded border shadow-sm"
                      style={{ backgroundColor: `hsl(var(--primary))` }}
                    />
                    <p className="text-xs text-center text-muted-foreground">{shade}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Will be populated from tokens.json in Phase 4
              </p>
            </div>
          </div>

          <Separator />

          {/* Semantic Colors */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Semantic Colors</h3>
              <Badge variant="secondary" className="text-xs">4 types</Badge>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { name: "Success", color: "hsl(142, 76%, 36%)", desc: "Positive actions and confirmations" },
                { name: "Warning", color: "hsl(38, 92%, 50%)", desc: "Cautionary messages" },
                { name: "Error", color: "hsl(0, 72%, 51%)", desc: "Errors and destructive actions" },
                { name: "Info", color: "hsl(199, 89%, 48%)", desc: "Informational messages" },
              ].map((item) => (
                <div key={item.name} className="rounded-lg border p-3 flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded border shadow-sm shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
          {/* Font Scale */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Type Scale</h3>
              <Badge variant="secondary" className="text-xs">9 sizes</Badge>
            </div>
            <div className="rounded-lg border p-4 bg-muted/30 space-y-3">
              {[
                { name: "xs", size: "0.75rem", example: "Extra small text for fine print" },
                { name: "sm", size: "0.875rem", example: "Small text for secondary content" },
                { name: "base", size: "1rem", example: "Base text size for body content" },
                { name: "lg", size: "1.125rem", example: "Large text for emphasis" },
                { name: "xl", size: "1.25rem", example: "Extra large for subheadings" },
                { name: "2xl", size: "1.5rem", example: "2XL for section headings" },
                { name: "3xl", size: "1.875rem", example: "3XL for page titles" },
              ].map((item) => (
                <div key={item.name} className="flex items-baseline gap-4 pb-2 border-b last:border-0">
                  <Badge variant="outline" className="text-xs shrink-0 w-12 justify-center">
                    {item.name}
                  </Badge>
                  <span style={{ fontSize: item.size }} className="font-medium">
                    {item.example}
                  </span>
                </div>
              ))}
              <p className="text-xs text-muted-foreground pt-2">
                Will be populated from tokens.json in Phase 4
              </p>
            </div>
          </div>

          <Separator />

          {/* Font Families */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Font Families</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border p-4 bg-muted/30">
                <p className="text-xs text-muted-foreground mb-2">Sans Serif (UI)</p>
                <p className="text-lg font-sans">The quick brown fox jumps</p>
              </div>
              <div className="rounded-lg border p-4 bg-muted/30">
                <p className="text-xs text-muted-foreground mb-2">Monospace (Code)</p>
                <p className="text-lg font-mono">const greeting = &quot;Hello&quot;</p>
              </div>
            </div>
          </div>
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
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Spacing Scale</h3>
              <Badge variant="secondary" className="text-xs">Base 4px</Badge>
            </div>
            <div className="rounded-lg border p-4 bg-muted/30 space-y-3">
              {[
                { name: "1", value: "0.25rem", px: "4px" },
                { name: "2", value: "0.5rem", px: "8px" },
                { name: "3", value: "0.75rem", px: "12px" },
                { name: "4", value: "1rem", px: "16px" },
                { name: "6", value: "1.5rem", px: "24px" },
                { name: "8", value: "2rem", px: "32px" },
                { name: "12", value: "3rem", px: "48px" },
                { name: "16", value: "4rem", px: "64px" },
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-4">
                  <Badge variant="outline" className="text-xs shrink-0 w-8 justify-center">
                    {item.name}
                  </Badge>
                  <div
                    className="bg-primary rounded"
                    style={{ height: "1rem", width: item.value }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {item.value} ({item.px})
                  </span>
                </div>
              ))}
              <p className="text-xs text-muted-foreground pt-2">
                Will be populated from tokens.json in Phase 4
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
