"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle2, Info, Terminal } from "lucide-react"
import { useState } from "react"

export default function ComponentsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <div className="flex min-h-full flex-1 flex-col gap-6 p-6 md:p-8 lg:p-10">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-bold tracking-tight">UI Components</h1>
          <Badge variant="outline">React + TypeScript</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Explore all available UI components from our design system
        </p>
      </div>

      {/* Buttons Section */}
      <Card>
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
          <CardDescription>
            Primary interaction elements with multiple variants and sizes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="space-y-4">
              <div className="rounded-lg border p-6 bg-muted/30">
                <div className="flex flex-wrap items-center gap-3">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Button Sizes</h4>
                <div className="rounded-lg border p-6 bg-muted/30">
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="code" className="space-y-3">
              <div className="relative rounded-lg border bg-slate-950 p-4">
                <pre className="text-sm text-slate-50 overflow-x-auto">
                  <code>{`import { Button } from "@/components/ui/button"

<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="destructive">Destructive</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>`}</code>
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={() => copyCode('Button code', 'button')}
                >
                  {copiedCode === 'button' ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Card Component */}
      <Card>
        <CardHeader>
          <CardTitle>Cards</CardTitle>
          <CardDescription>
            Container component with header, content, and footer sections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <div className="rounded-lg border p-6 bg-muted/30">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Card Title</CardTitle>
                      <CardDescription>Card description goes here</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">This is the card content area where you can place any elements.</p>
                    </CardContent>
                  </Card>
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        Highlighted Card
                      </CardTitle>
                      <CardDescription>With custom styling</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Cards are highly flexible and can be customized.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="code">
              <div className="relative rounded-lg border bg-slate-950 p-4">
                <pre className="text-sm text-slate-50 overflow-x-auto">
                  <code>{`import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>`}</code>
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={() => copyCode('Card code', 'card')}
                >
                  {copiedCode === 'card' ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Input Component */}
      <Card>
        <CardHeader>
          <CardTitle>Input</CardTitle>
          <CardDescription>
            Text input fields for forms and user data entry
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <div className="rounded-lg border p-6 bg-muted/30">
                <div className="max-w-md space-y-4">
                  <Input type="text" placeholder="Default input" />
                  <Input type="email" placeholder="Email input" />
                  <Input type="password" placeholder="Password input" />
                  <Input type="text" placeholder="Disabled input" disabled />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="code">
              <div className="relative rounded-lg border bg-slate-950 p-4">
                <pre className="text-sm text-slate-50 overflow-x-auto">
                  <code>{`import { Input } from "@/components/ui/input"

<Input type="text" placeholder="Default input" />
<Input type="email" placeholder="Email input" />
<Input type="password" placeholder="Password input" />
<Input type="text" placeholder="Disabled input" disabled />`}</code>
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={() => copyCode('Input code', 'input')}
                >
                  {copiedCode === 'input' ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Badge Component */}
      <Card>
        <CardHeader>
          <CardTitle>Badges</CardTitle>
          <CardDescription>
            Small labels for status, tags, and metadata
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <div className="rounded-lg border p-6 bg-muted/30">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge className="bg-green-600 hover:bg-green-700">Success</Badge>
                  <Badge className="bg-yellow-600 hover:bg-yellow-700">Warning</Badge>
                  <Badge className="bg-blue-600 hover:bg-blue-700">Info</Badge>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="code">
              <div className="relative rounded-lg border bg-slate-950 p-4">
                <pre className="text-sm text-slate-50 overflow-x-auto">
                  <code>{`import { Badge } from "@/components/ui/badge"

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>

// Custom colors
<Badge className="bg-green-600">Success</Badge>
<Badge className="bg-yellow-600">Warning</Badge>`}</code>
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={() => copyCode('Badge code', 'badge')}
                >
                  {copiedCode === 'badge' ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Alert Component */}
      <Card>
        <CardHeader>
          <CardTitle>Alerts</CardTitle>
          <CardDescription>
            Prominent messages for user notifications and feedback
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <div className="rounded-lg border p-6 bg-muted/30 space-y-4">
                <Alert>
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Default Alert</AlertTitle>
                  <AlertDescription>
                    This is a default alert with neutral styling.
                  </AlertDescription>
                </Alert>

                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error Alert</AlertTitle>
                  <AlertDescription>
                    Something went wrong. Please try again.
                  </AlertDescription>
                </Alert>

                <Alert className="border-green-600 bg-green-50 text-green-900 dark:bg-green-950/20 dark:text-green-100">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertTitle>Success Alert</AlertTitle>
                  <AlertDescription>
                    Your action was completed successfully!
                  </AlertDescription>
                </Alert>

                <Alert className="border-blue-600 bg-blue-50 text-blue-900 dark:bg-blue-950/20 dark:text-blue-100">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertTitle>Info Alert</AlertTitle>
                  <AlertDescription>
                    Here&apos;s some helpful information for you.
                  </AlertDescription>
                </Alert>
              </div>
            </TabsContent>
            <TabsContent value="code">
              <div className="relative rounded-lg border bg-slate-950 p-4">
                <pre className="text-sm text-slate-50 overflow-x-auto">
                  <code>{`import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal, AlertCircle } from "lucide-react"

<Alert>
  <Terminal className="h-4 w-4" />
  <AlertTitle>Default Alert</AlertTitle>
  <AlertDescription>
    This is a default alert message.
  </AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error Alert</AlertTitle>
  <AlertDescription>
    Something went wrong.
  </AlertDescription>
</Alert>`}</code>
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={() => copyCode('Alert code', 'alert')}
                >
                  {copiedCode === 'alert' ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Tabs Component */}
      <Card>
        <CardHeader>
          <CardTitle>Tabs</CardTitle>
          <CardDescription>
            Organize content into separate, switchable views
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <div className="rounded-lg border p-6 bg-muted/30">
                <Tabs defaultValue="account" className="w-full">
                  <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                  <TabsContent value="account" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Account Settings</CardTitle>
                        <CardDescription>Manage your account information</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">Account settings content goes here.</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="password" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Password Settings</CardTitle>
                        <CardDescription>Change your password</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">Password settings content goes here.</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="settings" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">General Settings</CardTitle>
                        <CardDescription>Manage preferences</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">General settings content goes here.</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>
            <TabsContent value="code">
              <div className="relative rounded-lg border bg-slate-950 p-4">
                <pre className="text-sm text-slate-50 overflow-x-auto">
                  <code>{`import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    Account content here
  </TabsContent>
  <TabsContent value="password">
    Password content here
  </TabsContent>
</Tabs>`}</code>
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={() => copyCode('Tabs code', 'tabs')}
                >
                  {copiedCode === 'tabs' ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Footer Note */}
      <Card className="border-2 border-dashed">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground text-center">
            All components are built with{" "}
            <a
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              shadcn/ui
            </a>
            {" "}and styled with design tokens from our system
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
