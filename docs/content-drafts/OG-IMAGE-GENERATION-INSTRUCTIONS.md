# OpenGraph Image Generation Instructions

This document provides instructions for generating the PNG version of the OpenGraph social sharing image.

## Related Issue

Closes #100 - Redesign OpenGraph social sharing image

## What Was Changed

The OpenGraph image has been redesigned to match OpenQase's brand identity:

**Previous design:** Blue (#3b82f6) quantum elements on dark slate background
**New design:** Warm amber (#d4a574, #dfc09a) quantum elements on deep navy background (#111318)

### Brand Colors Used

- **Background:** Deep navy gradient (`#0d0f14` → `#111318`)
- **Primary accent:** Warm amber (`#d4a574`)
- **Light accent:** Lighter amber (`#dfc09a`)
- **Text:** Warm grays (`#c4bfbf`, `#918a8a`)
- **Glow effects:** Amber radial gradients

These colors match the site's dark theme (Hex Warm) perfectly.

## Design Improvements

1. **Brand Consistency:** Uses warm amber/navy colors instead of blue
2. **Better Typography:** Larger "OpenQase" title (84px), improved spacing
3. **Enhanced Visuals:** Radial glow effect, gradient text, larger quantum circuit elements
4. **More Professional:** Subtle decorative elements, accent line under URL
5. **Improved Contrast:** Better text readability on dark background

## Files

- **Source:** `public/og-image.svg` (updated)
- **Output:** `public/og-image.png` (needs to be regenerated from new SVG)
- **Dimensions:** 1200x630px (standard OpenGraph size)

## How to Generate PNG

### Option 1: Online Converter (Easiest)

1. Go to https://svgtopng.com/ or https://cloudconvert.com/svg-to-png
2. Upload `public/og-image.svg`
3. Set dimensions to **1200x630 pixels** (or leave at default if already correct)
4. Convert and download
5. Save as `public/og-image.png` (replace existing file)
6. Verify file size is reasonable (~50-300KB)

### Option 2: Browser Screenshot (Quick)

1. Open `public/og-image.svg` in a web browser (Chrome, Firefox, Safari)
2. Set browser zoom to 100%
3. Open DevTools → Device toolbar (Cmd/Ctrl + Shift + M)
4. Set dimensions to 1200x630
5. Take screenshot (browser extension or built-in capture tool)
6. Save as `public/og-image.png`

### Option 3: Design Tool (Most Control)

1. Open `public/og-image.svg` in Figma, Sketch, or Illustrator
2. Verify artboard is 1200x630px
3. Export as PNG:
   - Format: PNG
   - Resolution: 1x (72 DPI is fine for web)
   - Dimensions: 1200x630px
4. Save as `public/og-image.png`

### Option 4: ImageMagick (Command Line)

If you have ImageMagick installed:

```bash
# Convert SVG to PNG
convert public/og-image.svg -resize 1200x630 public/og-image.png

# Or with better quality settings
convert public/og-image.svg -background none -resize 1200x630 -quality 90 public/og-image.png
```

To install ImageMagick:
- **Mac:** `brew install imagemagick`
- **Ubuntu/Debian:** `sudo apt-get install imagemagick`
- **Windows:** Download from https://imagemagick.org/script/download.php

## Testing the New Image

After generating the PNG, test it:

### 1. Local Preview

Open the PNG in an image viewer and verify:
- Dimensions are exactly 1200x630px
- Colors look correct (warm amber, not blue)
- Text is readable
- No distortion or artifacts
- File size is reasonable (~50-300KB)

### 2. Social Media Preview Tools

Test how it will appear on social platforms:

**Twitter/X:**
- https://cards-dev.twitter.com/validator
- Enter: https://openqase.com
- Verify image displays correctly

**LinkedIn:**
- https://www.linkedin.com/post-inspector/
- Enter: https://openqase.com
- Check preview

**Facebook:**
- https://developers.facebook.com/tools/debug/
- Enter: https://openqase.com
- Click "Scrape Again" if needed

**Slack:**
- Send message with https://openqase.com link in Slack
- Check unfurl preview

### 3. Deploy and Test

1. Commit the new `og-image.png`
2. Push to production
3. Clear social media caches (use validators above)
4. Share a link and verify it looks good

## Technical Details

### Image Specifications

- **Format:** PNG (required for broad social media compatibility)
- **Dimensions:** 1200 x 630 pixels (1.91:1 aspect ratio)
- **File size:** Ideally under 300KB (Twitter limit: 5MB, Facebook limit: 8MB)
- **Color space:** sRGB
- **Transparency:** Not recommended (some platforms don't support it)

### Where It's Used

The OG image is referenced in the site's metadata:

```typescript
// In page metadata (e.g., app/layout.tsx, page.tsx)
openGraph: {
  images: [
    {
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'OpenQase - Quantum Computing Business Cases',
    },
  ],
}
```

### Social Media Platform Requirements

| Platform | Recommended Size | Aspect Ratio | Max File Size |
|----------|------------------|--------------|---------------|
| Twitter/X | 1200x628 | 1.91:1 | 5MB |
| LinkedIn | 1200x627 | 1.91:1 | 5MB |
| Facebook | 1200x630 | 1.91:1 | 8MB |
| Slack | 1200x630 | 1.91:1 | - |

Our 1200x630 size works perfectly for all platforms.

## Future Enhancements

Consider implementing dynamic OG images in the future:

### Next.js OG Image Generation

Next.js 13+ supports dynamic OG image generation:

```typescript
// app/og-image.tsx
import { ImageResponse } from '@vercel/og';

export default function OGImage() {
  return new ImageResponse(
    (
      <div style={{ /* Styles */ }}>
        {/* Dynamic content */}
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
```

**Benefits:**
- Generate custom OG images per page
- Include dynamic content (case study titles, etc.)
- No manual PNG conversion needed

**Reference:**
- https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image

## Troubleshooting

### SVG Doesn't Display Correctly

- Check if fonts are available (falls back to Arial/sans-serif)
- Verify gradients are defined in `<defs>` section
- Ensure all IDs are unique

### PNG Quality Issues

- Use higher quality settings in converter
- Try different conversion tools
- Check source SVG isn't distorted

### Social Media Not Showing New Image

- Clear cache using social media validators
- Wait 24-48 hours for caches to expire naturally
- Force refresh with `?v=2` query parameter in URL

### File Size Too Large

- Reduce quality slightly (90% vs 100%)
- Use PNG optimization tools (TinyPNG, OptiPNG)
- Consider removing some decorative elements

## Commit Message

When committing the regenerated PNG:

```bash
git add public/og-image.png
git commit -m "design: regenerate OG image PNG with new brand colors

Converted updated SVG (warm amber/navy theme) to PNG format
for OpenGraph social media sharing."
```

---

**Created:** January 8, 2026
**For Milestone:** v0.6.0 - Content Quality & Cleanup
**Issue:** #100
