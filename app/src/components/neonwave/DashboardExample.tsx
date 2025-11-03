/**
 * DashboardExample Component
 * Example implementation of Neonwave '94 dashboard
 * Demonstrates usage of all design system components
 */

import React from 'react';
import { Card } from './Card';
import { StatCard } from './StatCard';
import { NeonButton } from './NeonButton';
import { ActivityItem } from './ActivityItem';
import { SectionHeader } from './SectionHeader';
import { BarChart } from './BarChart';

export const DashboardExample: React.FC = () => {
  const performanceData = [
    46, 135, 203, 232, 215, 157, 73, 112, 187, 228, 224, 177, 98, 86, 168, 220,
    230, 195, 123, 60, 147, 210, 232, 209
  ];

  const activities = [
    { message: 'New signup: retro_fan92', timestamp: '2m' },
    { message: 'Order #A1F3 processed', timestamp: '12m' },
    { message: 'Uptime check: all systems', timestamp: '28m' },
    { message: 'Export CSV completed', timestamp: '1h' },
    { message: 'Weekly backup finished', timestamp: '3h' },
  ];

  return (
    <div
      className="min-h-screen p-[--spacing-2xl]"
      style={{ background: 'var(--color-background-primary)' }}
    >
      {/* Header */}
      <header
        className="mb-[--spacing-2xl] p-[--spacing-lg] rounded-[--radius-md] border-b border-solid"
        style={{
          background: 'linear-gradient(to right, var(--color-gradient-header-from) 0%, var(--color-gradient-header-via) 60%, var(--color-gradient-header-to) 100%)',
          borderColor: 'var(--color-border-primary)'
        }}
      >
        <div className="flex items-center justify-between">
          <h1
            className="font-[--font-family-display] text-[16px] leading-[24px] tracking-[0.2em]"
            style={{ color: 'var(--color-text-primary)' }}
          >
            NEONWAVE '94
          </h1>
          <div className="flex gap-[--spacing-md]">
            <NeonButton size="md">Docs</NeonButton>
            <NeonButton size="md">Toggle Theme</NeonButton>
          </div>
        </div>
      </header>

      {/* Overview Section */}
      <Card className="p-[--spacing-xl] mb-[--spacing-lg]">
        <div className="flex items-baseline justify-between mb-[--spacing-md]">
          <div>
            <h2
              className="font-[--font-family-display] text-[16px] leading-[24px] tracking-[0.35em] mb-[--spacing-xs]"
              style={{ color: 'var(--color-text-primary)' }}
            >
              OVERVIEW
            </h2>
            <p
              className="font-[--font-family-sans] text-[14px] leading-[20px]"
              style={{ color: 'var(--color-text-quaternary)' }}
            >
              NEONWAVE '94 · Retro Dashboard
            </p>
          </div>
          <div className="text-right">
            <p
              className="font-[--font-family-display] text-[11px] leading-[16.5px] tracking-[0.3em] mb-[--spacing-xs]"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Mon, 03 Nov 2025
            </p>
            <p
              className="font-[--font-family-sans] font-bold text-[36px] leading-[40px] tracking-[-0.025em]"
              style={{ color: 'var(--color-text-primary)' }}
            >
              11:54:17
            </p>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[--spacing-lg] mb-[--spacing-lg]">
        <StatCard
          label="SESSIONS"
          value="24,891"
          subtitle="+12.4% WoW"
          indicator="pink"
        />
        <StatCard
          label="REVENUE"
          value="$12,430"
          subtitle="+6.2% WoW"
          indicator="pink"
        />
        <StatCard
          label="CONVERSION"
          value="3.9%"
          subtitle="+0.4pp WoW"
          indicator="pink"
        />
        <StatCard
          label="UPTIME"
          value="99.98%"
          subtitle="24h"
          indicator="pink"
        />
      </div>

      {/* Performance & Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[--spacing-lg]">
        {/* Performance Chart */}
        <Card className="p-[--spacing-xl] lg:col-span-2">
          <SectionHeader>PERFORMANCE</SectionHeader>
          <BarChart data={performanceData} maxHeight={256} />
        </Card>

        {/* Activity Feed */}
        <Card className="p-[--spacing-xl]">
          <SectionHeader>ACTIVITY</SectionHeader>
          <div>
            {activities.map((activity, index) => (
              <ActivityItem
                key={index}
                message={activity.message}
                timestamp={activity.timestamp}
              />
            ))}
          </div>
        </Card>
      </div>

      {/* Footer */}
      <footer
        className="mt-[--spacing-2xl] p-[--spacing-lg] border-t border-solid"
        style={{
          background: 'var(--color-background-overlay)',
          borderColor: 'var(--color-border-secondary)'
        }}
      >
        <div className="flex items-center justify-between">
          <p
            className="font-[--font-family-display] text-[12px] leading-[16px] tracking-[0.1em]"
            style={{ color: 'var(--color-text-quaternary)' }}
          >
            © 1994 · 2025 NeonWave Labs
          </p>
          <div className="flex items-center gap-[--spacing-md]">
            <div
              className="w-[8px] h-[8px] rounded-full"
              style={{
                background: 'var(--color-neon-pink)',
                boxShadow: 'var(--shadow-neon-glow-pink)'
              }}
            />
            <p
              className="font-[--font-family-display] text-[12px] leading-[16px] tracking-[0.1em]"
              style={{ color: 'var(--color-text-quaternary)' }}
            >
              ONLINE
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardExample;
