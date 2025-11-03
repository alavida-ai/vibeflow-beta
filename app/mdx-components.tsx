/**
 * MDX Components Provider
 *
 * Makes design system components available globally in all MDX files.
 * This enables content generation with branded components.
 *
 * Usage in MDX:
 * ```mdx
 * <Card glow={true}>
 *   <StatCard label="SESSIONS" value="24,891" />
 * </Card>
 * ```
 */

import type { MDXComponents } from 'mdx/types';
import {
  Card,
  NeonButton,
  StatCard,
  SectionHeader,
  ActivityItem,
  BarChart,
} from '@design/components';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Spread existing components
    ...components,

    // Design system components (Neonwave '94 aesthetic)
    Card,
    NeonButton,
    StatCard,
    SectionHeader,
    ActivityItem,
    BarChart,

    // You can override default HTML elements here
    // For example, to style all h1 tags with brand styling:
    // h1: (props) => <h1 className="font-[--font-family-display] text-[--color-neon-pink]" {...props} />,
  };
}
