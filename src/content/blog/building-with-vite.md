---
title: "Building a Blog with Vite and Markdown"
date: 2026-04-25
tags: ["frontend", "react", "tooling"]
excerpt: "How I built a zero-runtime-cost blog into my React portfolio using a custom Vite plugin."
slug: "building-with-vite"
---

## Why Build-Time Markdown?

Most blog solutions either pull in a heavy MDX runtime or require a CMS. I wanted
something simpler: write `.md` files, commit them to git, and have them transformed
to static HTML at build time.

### The Pipeline

1. **gray-matter** extracts YAML frontmatter
2. **unified + remark** parses markdown to an AST
3. **rehype + Shiki** converts to HTML with syntax highlighting
4. A custom **Vite plugin** ties it all together

### Example: The Transform Hook

```javascript
async transform(code, id) {
  if (!id.endsWith('.md')) return null;
  const { data, content } = matter(code);
  // ... process with unified pipeline
  return { code: `export const frontmatter = ...`, map: null };
}
```

The result is zero JavaScript overhead for markdown processing in the browser.
