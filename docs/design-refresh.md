# OpenQASE Design Refresh

This document outlines the planned design refresh for OpenQASE, including color schemes, typography, layout changes, and component updates.

## Color Scheme: "Synthwave"

### Primary Colors
- Primary Purple: `#7C3AED`
- Background: Dark theme with white text
- Gradients: Subtle purple overlays
- Accents: Soft purple for secondary elements

### Implementation Priority
1. Update color tokens in design system
2. Create new gradient utility classes
3. Update dark theme configuration
4. Implement accent color system

## Typography & Layout

### Text Hierarchy
- Hero Headlines: Large, bold, multi-line for emphasis
- Subtitles: Concise, muted style
- Body Text: Clean, readable with proper spacing

### Layout Updates
- Centered hero sections with compact text
- Consistent spacing system
- Clean grid structure

### Implementation Priority
1. Update typography scale
2. Implement new spacing system
3. Revise hero section layouts
4. Update grid components

## Call-to-Action Elements

### Button Updates
- Primary: Solid purple with hover effects
- Secondary: Outline style
- Text Updates: "Sign Up" → "Get Started"

### Implementation Priority
1. Update button component styles
2. Implement new hover effects
3. Update button text across site
4. Add transition animations

## Animations & Interactions

### Background Particles
- Implement subtle floating particle animation in hero sections
- Particles should follow synthwave color scheme
- Particles should be responsive and scale with viewport
- Consider performance impact and implement with canvas for better performance

### Implementation Priority
1. Create prototype of particle system
2. Test performance across devices
3. Implement responsive scaling
4. Add interaction effects (optional hover responses)

### Technical Considerations
- Use HTML Canvas for better performance
- Implement fps limiting for mobile devices
- Add disable option for reduced motion preferences
- Ensure particles don't interfere with text readability

## Learning Path Cards

### Layout
- Three-card layout below hero section
- Centered content with consistent spacing
- Responsive grid (3 columns on desktop, stack on mobile)
- Card spacing should match site's spacing system

### Card Components
- Consistent height and width
- Light background with subtle shadow
- Rounded corners matching site's radius tokens
- Elements in each card:
  - Icon in light purple circle (#7C3AED at lower opacity)
  - Clear heading (larger than body, smaller than hero)
  - Descriptive text in muted color
  - "Explore Path" button in primary purple

### Typography
- Section Title: "Choose Your Learning Path"
  - Prominent, centered
  - Same style as other section headings
- Section Subtitle: Centered, muted color
- Card Headings: Bold, clear hierarchy
- Card Descriptions: Regular weight, muted

### Implementation Priority
1. Create reusable card component
2. Implement responsive grid layout
3. Style icons and circles
4. Add hover states for interactive elements
5. Ensure consistent spacing and alignment

### Accessibility
- Ensure sufficient color contrast
- Maintain clear visual hierarchy
- Add proper ARIA labels
- Ensure keyboard navigation works properly

## Featured Case Studies Section

### Layout
- Section header with right-aligned "View All" link
- Three-card grid layout
- Responsive design (stack on mobile)
- Consistent spacing with other sections

### Card Components
- Large image area at top:
  - Use abstract geometric patterns related to quantum concepts
  - Patterns should be simple and not distract from content
  - Consider using quantum circuit-inspired designs
- Two-tag system:
  - Industry tag (Finance, Healthcare, Logistics etc.)
  - Technology tag (QAOA, VQE, Quantum Annealing etc.)
- Clear title with proper heading hierarchy
- Concise description showing business impact with specific metrics
- Subtle shadow effect for depth
- Consistent border radius with other components

### Typography
- Section Title: "Featured Case Studies"
  - Left-aligned
  - Same style as other section headings
- Section Subtitle: Muted color
- Card Title: Bold, two lines maximum
- Description: Regular weight, three lines maximum
- Tags: Small, distinctive style for each type
- "View All" link: Include arrow icon

### Content Management
- Add to case study frontmatter:
  ```yaml
  featured: boolean
  featuredOrder: number (optional)
  industry: string
  technology: string
  metrics: string
  ```
- Featured case studies will be filtered and sorted based on these fields

### Accessibility
- Proper heading structure
- Descriptive alt text for images
- Keyboard navigation support
- Clear link text and destinations

## Why Choose OpenQASE? Section

### Layout
- Centered section header
- 2x3 grid of feature cards
- Responsive layout:
  - Desktop: 2 rows, 3 columns
  - Tablet: 3 rows, 2 columns
  - Mobile: 6 rows, 1 column
- Consistent spacing between cards

### Section Header
- Title: "Why Choose OpenQASE?"
- Subtitle: Platform value proposition
- Centered alignment
- Adequate spacing before feature grid

### Feature Cards
- Simple, minimal design:
  - White background
  - Subtle shadow
  - Rounded corners
  - No hover states (informational)
- Components:
  - Purple icon at top
  - Clear feature title
  - Single-paragraph description
- No buttons or interactive elements

### Content Structure
Six key features:
1. Accessible Knowledge
   - Icon: Light bulb/brain
   - Focus: Business-friendly explanations
2. Real-world Case Studies
   - Icon: Document/folder
   - Focus: Practical implementations
3. Role-Based Learning
   - Icon: People/users
   - Focus: Professional relevance
4. Industry Relevance
   - Icon: Building/industry
   - Focus: Sector-specific applications
5. Algorithm Clarity
   - Icon: Circuit/flowchart
   - Focus: Problem-solution mapping
6. Implementation Guidance
   - Icon: Arrow/steps
   - Focus: Technical execution

### Typography
- Section Title: Large, bold
- Section Subtitle: Muted, centered
- Feature Titles: Medium, bold
- Descriptions: Regular weight, muted
- Consistent line heights
- Maximum width for readability

### Icons
- Use Lucide icons for consistency
- Purple color matching theme
- Consistent size across all features
- Simple, clear designs

### Implementation Priority
1. Create section layout
2. Implement responsive grid
3. Style feature cards
4. Add and style icons
5. Optimize typography and spacing

### Accessibility
- Semantic HTML structure
- Clear heading hierarchy
- Descriptive alt text for icons
- Proper color contrast

## About Page

### Page Structure
- Breadcrumb navigation
- Page title "About OpenQASE"
- Brief platform description
- Key sections in logical flow

### Core Sections

#### Our Mission
- Clear, concise mission statement
- Focus on bridging theory and practice
- Highlight the platform's unique value proposition

#### Our Approach
- Explanation of how we achieve our mission
- Focus on making quantum computing accessible
- Emphasis on structured, accessible content

#### Our Vision
- Bullet-point list of key objectives:
  - Democratizing Knowledge
  - Bridging Theory and Practice
  - Supporting Informed Decision-Making
  - Accelerating Skill Development
  - Building Community

### Sidebar Components

#### Join Our Community
- Call-to-action panel
- Newsletter signup
- Community value proposition
- "Subscribe to Updates" button

#### Our Team
- Multidisciplinary expertise areas:
  - Quantum Computing
  - Business Strategy
  - Education & Knowledge Sharing
  - Content Development
- Clean icon-based list

#### Contact Us
- Clear call-to-action
- Simple contact prompt
- "Get in Touch" button

### Typography
- Page Title: Extra large, bold
- Section Headers: Large, bold
- Body Text: Regular weight, good readability
- Bullet Points: Clean, consistent styling

### Layout
- Main content: ~66% width
- Sidebar: ~33% width
- Responsive:
  - Stack sidebar below main content on mobile
  - Maintain readable line lengths
  - Consistent spacing between sections

### Visual Elements
- Use new synthwave color scheme
- Consistent icon style
- Proper spacing between sections
- Clean dividers where needed

### Accessibility
- Clear heading hierarchy
- Proper landmark regions
- Consistent navigation patterns
- Readable text contrast

## Next Steps

1. Create Figma mockups for key pages
2. Update design tokens
3. Implement new color scheme
4. Update typography system
5. Revise component library
6. Test across different viewports
7. Gather feedback
8. Roll out changes incrementally

## Components to Update

- [ ] Navigation
- [ ] Hero sections
- [ ] Cards
- [ ] Buttons
- [ ] Forms
- [ ] Footer
- [ ] Learning path layouts
- [ ] Case study layouts

## Notes

- All changes should maintain accessibility standards
- Consider implementing dark/light mode toggle
- Ensure consistent spacing across all components
- Document all new design tokens and utilities 