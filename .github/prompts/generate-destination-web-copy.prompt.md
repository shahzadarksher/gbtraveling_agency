---
description: "Generate HTML snippets for destination landing pages with hero section, highlights, and call-to-action"
name: "GB Destination Web Copy"
argument-hint: "destination name and key features"
agent: "agent"
---

Generate semantic HTML for a destination landing page section that can be integrated into the website. Include:

1. **Hero Headline**: Compelling, SEO-friendly heading with destination name
2. **Hero Subheading**: Brief tagline capturing the essence
3. **Overview Section**: 2-3 paragraph description with benefits
4. **Highlights Grid**: 4 cards with icons/labels and descriptions
5. **Call-to-Action**: Button encouraging booking or exploration

**HTML Structure**:
- Use semantic HTML5 tags (`<section>`, `<article>`, `<aside>`)
- Include descriptive class names for CSS styling
- Responsive design (mobile-first) with no inline styles
- Proper heading hierarchy (h1 for main, h2 for subsections)
- Accessibility: alt text descriptions, semantic structure, ARIA labels where needed

**Example output structure**:
```html
<section class="destination-hero">
  <h1 class="destination-title">Destination Name</h1>
  <p class="destination-tagline">Compelling tagline</p>
</section>

<section class="destination-overview">
  <article class="overview-content">
    <p>Opening paragraph...</p>
    <p>Experience paragraph...</p>
    <p>Closing paragraph...</p>
  </article>
</section>

<section class="destination-highlights">
  <h2>Why Visit</h2>
  <div class="highlights-grid">
    <div class="highlight-card">
      <h3>Highlight Title</h3>
      <p>Description...</p>
    </div>
    <!-- More cards -->
  </div>
</section>

<section class="destination-cta">
  <a href="#" class="btn btn-primary">Explore Packages</a>
</section>
```

Requirements:
- Follow the tone and guidelines from `travel-content-guidelines.instructions.md`
- Make copy compelling for your target audience
- Use realistic details from the destination
- Include proper semantic markup for accessibility
- Keep HTML clean and production-ready
