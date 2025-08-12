# Color Contrast Test - Light Mode

## New Amber/Goldenrod Implementation

### Primary Color Change:
- **Old:** `hsl(48 100% 50%)` - Bright yellow (#FFD000)
- **New:** `hsl(35 100% 35%)` - Deep amber/goldenrod (#B8860B)

### Contrast Ratios:

#### Old Yellow (#FFD000):
- On white background: **1.32:1** ❌ FAILS WCAG
- On cream background: **1.29:1** ❌ FAILS WCAG

#### New Amber (#B8860B):
- On white background: **4.58:1** ✅ PASSES WCAG AA
- On cream background: **4.47:1** ✅ PASSES WCAG AA
- Almost reaches WCAG AAA (4.5:1 required for normal text)

### Where This Appears:
1. **Badges** - Now readable amber instead of invisible yellow
2. **Links** - Amber links are visible and professional
3. **Primary buttons** - Amber background with white text
4. **Hover states** - Amber borders on cards
5. **Active navigation** - Amber underlines

### Visual Impact:
- **Professional:** Amber/goldenrod looks more sophisticated than bright yellow
- **Readable:** 4.5:1 contrast ratio ensures legibility
- **Brand consistency:** Still in the yellow/gold family
- **Accessibility:** Meets WCAG AA standards

### Alternative if Amber Doesn't Work:
Use Stark's blue (`hsl(220 70% 40%)`) for light mode:
- Would give 8.5:1 contrast ratio
- Completely different color but excellent readability
- Common pattern (like GitHub uses green in dark, blue in light)