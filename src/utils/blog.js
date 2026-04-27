const modules = import.meta.glob('../content/blog/*.md', { eager: true });

export function loadAllPosts() {
  const posts = Object.values(modules).map((mod) => ({
    frontmatter: mod.frontmatter,
    html: mod.html,
    slug: mod.frontmatter.slug,
  }));
  return posts.sort(
    (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
  );
}

export function getPostBySlug(slug) {
  return loadAllPosts().find((p) => p.slug === slug) ?? null;
}

export function getAllTags() {
  const tags = new Set();
  for (const mod of Object.values(modules)) {
    for (const tag of mod.frontmatter.tags ?? []) {
      tags.add(tag);
    }
  }
  return [...tags].sort();
}

export function readingTime(html) {
  const text = html.replace(/<[^>]*>/g, '');
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export function getAdjacentPosts(slug) {
  const posts = loadAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  return {
    prev: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  };
}
