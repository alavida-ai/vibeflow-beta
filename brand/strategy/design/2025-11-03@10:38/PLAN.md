# Design System Showcase App - Execution Plan

## Objective

Transform the current shadcn admin template into a clean, simple design system showcase application that displays design tokens and UI components, similar to Shopify Polaris documentation.

## Context

**Current State:**
- Full-featured admin template with 3 dashboards, tasks, users, settings, developers sections
- 40+ shadcn/ui components
- Complex authentication and authorization flows
- Multiple data tables, forms, and management interfaces

**Desired State:**
- Simple, public showcase application (no authentication)
- Three main sections: Home, Tokens, Components
- Direct integration with design system at `/brand/strategy/design/`
- Clean sidebar navigation
- Focus on displaying design tokens and component examples

**Design System Integration:**
- Tokens location: `/brand/strategy/design/build/tokens.json`
- Built tokens CSS: `/brand/strategy/design/build/tokens.css`
- Token source: `/brand/strategy/design/tokens/*.json`

## Success Criteria

- [ ] All unnecessary features removed (auth, dashboards, tasks, users, settings, developers)
- [ ] Clean home page explaining the design system
- [ ] Tokens page displaying colors, typography, spacing from design system
- [ ] Components page showcasing all UI components with live examples
- [ ] Sidebar navigation updated to new structure
- [ ] App imports and displays actual design tokens from `/brand/strategy/design/`
- [ ] Zero authentication/authorization code
- [ ] App runs successfully with `npm run dev`

## Phases

### Phase 1: Audit & Document Current Structure
**Objective:** Understand exactly what exists and what needs to be removed

**Tasks:**
- Document all current routes and pages
- Identify all components to keep vs. remove
- Map out current navigation structure
- Identify dependencies (auth providers, data fetching, etc.)

**Artifacts:**
- `01-current-structure-audit.md` - Complete inventory of pages, components, dependencies

### Phase 2: Cleanup - Remove Unnecessary Features
**Objective:** Strip down to essential structure only

**Tasks:**
- Remove all auth pages and layouts (`/login`, `/register`, `/forgot-password`)
- Remove all dashboard variants (`/dashboard-1`, `/dashboard-2`, `/dashboard-3`)
- Remove tasks section (`/tasks/*`)
- Remove users section (`/users/*`)
- Remove settings section (`/settings/*`)
- Remove developers section (`/developers/*`)
- Remove error pages except 404
- Clean up auth providers and related dependencies
- Update root layout to remove auth checks

**Artifacts:**
- `02-cleanup-summary.md` - List of deleted files and updated dependencies

### Phase 3: Create New Pages
**Objective:** Build the three core pages for the showcase

**Tasks:**
- Create home page (`/page.tsx`) - Simple landing with design system overview
- Create tokens page (`/tokens/page.tsx`) - Display colors, typography, spacing
- Create components page (`/components/page.tsx`) - Showcase all UI components
- Design simple, clean layouts for each page

**Artifacts:**
- `03a-home-page.tsx` - Home page component
- `03b-tokens-page.tsx` - Tokens showcase page
- `03c-components-page.tsx` - Components showcase page

### Phase 4: Design System Integration
**Objective:** Connect app to actual design tokens

**Tasks:**
- Read `/brand/strategy/design/build/tokens.json` and display token values
- Import `/brand/strategy/design/build/tokens.css` in app layout
- Create token display components (ColorSwatch, TypeScale, SpacingScale)
- Ensure all displayed tokens reference actual design system values

**Artifacts:**
- `04a-token-reader.ts` - Utility to read and parse tokens.json
- `04b-token-display-components.tsx` - Components for visualizing tokens
- `04c-integration-summary.md` - How the app connects to design system

### Phase 5: Update Navigation
**Objective:** Simplify sidebar to match new structure

**Tasks:**
- Update `/src/components/layout/data/sidebar-data.tsx` with new nav structure
- Remove all old navigation items (dashboards, tasks, users, settings, developers)
- Add new items: Home, Tokens, Components
- Simplify header if needed
- Test navigation flow

**Artifacts:**
- `05-navigation-config.tsx` - Updated sidebar configuration

### Phase 6: Testing & Verification
**Objective:** Ensure app works end-to-end

**Tasks:**
- Test build: `npm run build`
- Test dev server: `npm run dev`
- Verify all pages load correctly
- Verify design tokens display correctly
- Verify component examples render properly
- Check for console errors
- Verify responsive behavior

**Artifacts:**
- `06-testing-report.md` - Test results and any issues found

## Dependencies

**External:**
- Design system must be built: `cd /brand/strategy/design && npm run tokens:build`
- Next.js app dependencies: Already installed

**Internal:**
- Must keep all `/src/components/ui/*` components
- Must keep layout components (sidebar, header)
- Can remove all page-specific components

## Risks & Mitigations

**Risk:** Breaking build by removing too many dependencies
- **Mitigation:** Incremental removal, test build after each phase

**Risk:** Design token integration complexity
- **Mitigation:** Start with simple JSON read, progressively enhance

**Risk:** UI component showcases require significant boilerplate
- **Mitigation:** Start with 3-5 key components, expand iteratively

## Timeline Estimate

- Phase 1: 30 minutes (audit)
- Phase 2: 1 hour (cleanup)
- Phase 3: 2 hours (new pages)
- Phase 4: 1 hour (design system integration)
- Phase 5: 30 minutes (navigation)
- Phase 6: 30 minutes (testing)

**Total:** ~5.5 hours

## Notes

- This is a destructive operation - consider git commit before starting
- Keep the cleanup surgical - only remove what's needed
- Prioritize simplicity over feature completeness
- The showcase should be beautiful but minimal
- Focus on showcasing the design system, not building another admin template

## Approval

Once approved, run `/implement` to execute this plan.
