/**
 * Design System Test Page
 *
 * Tests importing and using design system components
 * Navigate to /design-test to view
 */

import { Card, NeonButton, StatCard, SectionHeader, BarChart } from '@design/components';

export default function DesignTestPage() {
  const chartData = [46, 135, 203, 232, 215, 157];

  return (
    <div
      className="min-h-screen p-[--spacing-5xl]"
      style={{ background: 'var(--color-background-primary)' }}
    >
      {/* Page Header */}
      <div className="mb-[--spacing-5xl]">
        <h1
          className="font-[--font-family-display] text-[--font-size-5xl] mb-[--spacing-lg]"
          style={{
            color: 'var(--color-neon-pink)',
            letterSpacing: 'var(--font-letter-spacing-retro)',
          }}
        >
          DESIGN SYSTEM TEST
        </h1>
        <p
          className="text-[--font-size-lg]"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Testing Neonwave '94 components and design tokens
        </p>
      </div>

      {/* Section: Components */}
      <div className="mb-[--spacing-5xl]">
        <SectionHeader>COMPONENTS</SectionHeader>

        <div className="mt-[--spacing-xl] space-y-[--spacing-lg]">
          {/* Card Component */}
          <Card glow={true}>
            <h3
              className="font-[--font-family-display] text-[--font-size-sm] mb-[--spacing-md]"
              style={{
                color: 'var(--color-neon-cyan)',
                letterSpacing: 'var(--font-letter-spacing-retro)',
              }}
            >
              CARD COMPONENT
            </h3>
            <p style={{ color: 'var(--color-text-tertiary)' }}>
              This is a glassmorphic card with neon glow effect. It uses design tokens
              for colors, spacing, and shadows.
            </p>
          </Card>

          {/* Buttons */}
          <Card>
            <h3
              className="font-[--font-family-display] text-[--font-size-sm] mb-[--spacing-md]"
              style={{
                color: 'var(--color-neon-cyan)',
                letterSpacing: 'var(--font-letter-spacing-retro)',
              }}
            >
              BUTTON VARIANTS
            </h3>
            <div className="flex gap-[--spacing-md]">
              <NeonButton variant="primary" size="sm">
                SMALL
              </NeonButton>
              <NeonButton variant="primary" size="md">
                MEDIUM
              </NeonButton>
              <NeonButton variant="primary" size="lg">
                LARGE
              </NeonButton>
            </div>
          </Card>
        </div>
      </div>

      {/* Section: Stats Grid */}
      <div className="mb-[--spacing-5xl]">
        <SectionHeader>STATISTICS</SectionHeader>

        <div className="mt-[--spacing-xl] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[--spacing-lg]">
          <StatCard
            label="SESSIONS"
            value="24,891"
            subtitle="+12.4% WoW"
            indicator="pink"
          />
          <StatCard
            label="CONVERSIONS"
            value="1,847"
            subtitle="+8.2% WoW"
            indicator="cyan"
          />
          <StatCard
            label="REVENUE"
            value="$127.8K"
            subtitle="+15.3% WoW"
            indicator="pink"
          />
          <StatCard label="AVG TIME" value="4m 32s" subtitle="+2.1% WoW" indicator="cyan" />
        </div>
      </div>

      {/* Section: Chart */}
      <div className="mb-[--spacing-5xl]">
        <SectionHeader>DATA VISUALIZATION</SectionHeader>

        <Card glow={false}>
          <BarChart data={chartData} maxHeight={256} />
        </Card>
      </div>

      {/* Section: Design Tokens Reference */}
      <div>
        <SectionHeader>DESIGN TOKENS</SectionHeader>

        <Card>
          <h3
            className="font-[--font-family-display] text-[--font-size-sm] mb-[--spacing-md]"
            style={{
              color: 'var(--color-neon-cyan)',
              letterSpacing: 'var(--font-letter-spacing-retro)',
            }}
          >
            COLOR TOKENS
          </h3>
          <div className="grid grid-cols-3 gap-[--spacing-md]">
            <div>
              <div
                className="h-16 rounded-[--radius-md] mb-[--spacing-sm]"
                style={{ background: 'var(--color-neon-pink)' }}
              />
              <p
                className="text-[--font-size-xs]"
                style={{ color: 'var(--color-text-muted)' }}
              >
                neon-pink
              </p>
            </div>
            <div>
              <div
                className="h-16 rounded-[--radius-md] mb-[--spacing-sm]"
                style={{ background: 'var(--color-neon-cyan)' }}
              />
              <p
                className="text-[--font-size-xs]"
                style={{ color: 'var(--color-text-muted)' }}
              >
                neon-cyan
              </p>
            </div>
            <div>
              <div
                className="h-16 rounded-[--radius-md] mb-[--spacing-sm]"
                style={{ background: 'var(--color-neon-white)' }}
              />
              <p
                className="text-[--font-size-xs]"
                style={{ color: 'var(--color-text-muted)' }}
              >
                neon-white
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer Note */}
      <div className="mt-[--spacing-5xl] text-center">
        <p
          className="text-[--font-size-sm]"
          style={{ color: 'var(--color-text-quaternary)' }}
        >
          All components and styles come from{' '}
          <code style={{ color: 'var(--color-neon-cyan)' }}>
            @design/components
          </code>
        </p>
        <p
          className="text-[--font-size-xs] mt-[--spacing-sm]"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Source: /brand/strategy/design/
        </p>
      </div>
    </div>
  );
}
