import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Palette, Component, Sparkles } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Vibeflow Design System",
  description: "A comprehensive showcase of design tokens and UI components",
}

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-1 flex-col gap-6 p-6 md:p-8 lg:p-10">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-bold tracking-tight">Vibeflow Design System</h1>
          <Badge variant="secondary" className="h-6">
            <Sparkles className="mr-1 h-3 w-3" />
            v1.0
          </Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          A comprehensive showcase of design tokens and UI components for building consistent, beautiful interfaces
        </p>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Tokens Card */}
        <Card className="transition-all hover:shadow-md">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Palette className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Design Tokens</CardTitle>
            </div>
            <CardDescription>
              Explore our foundational design tokens
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Design tokens are the visual design atoms of our system. They define colors, typography, spacing, and more.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>Color palettes and semantic colors</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>Typography scales and font families</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>Spacing and sizing systems</span>
              </li>
            </ul>
            <a
              href="/tokens"
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              View tokens →
            </a>
          </CardContent>
        </Card>

        {/* Components Card */}
        <Card className="transition-all hover:shadow-md">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Component className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>UI Components</CardTitle>
            </div>
            <CardDescription>
              Browse our reusable component library
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Pre-built, accessible components built with React and styled with our design tokens.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>Buttons, inputs, and form controls</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>Cards, alerts, and notifications</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>Navigation and layout components</span>
              </li>
            </ul>
            <a
              href="/components"
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              View components →
            </a>
          </CardContent>
        </Card>
      </div>

      {/* Getting Started Section */}
      <Card className="border-2 border-dashed">
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Quick start guide to using the design system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm font-medium mb-2">Design tokens are loaded from:</p>
            <code className="text-xs bg-background px-2 py-1 rounded border">
              /brand/strategy/design/build/tokens.json
            </code>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 text-sm">
            <div>
              <p className="font-medium mb-1">1. Explore Tokens</p>
              <p className="text-muted-foreground">Start with our design tokens to understand the visual foundation</p>
            </div>
            <div>
              <p className="font-medium mb-1">2. Browse Components</p>
              <p className="text-muted-foreground">See how tokens are applied to create consistent UI components</p>
            </div>
            <div>
              <p className="font-medium mb-1">3. Build Interfaces</p>
              <p className="text-muted-foreground">Use our components to build beautiful, consistent user interfaces</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
