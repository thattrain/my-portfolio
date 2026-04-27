import { readFile } from 'fs/promises';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeShikiFromHighlighter from '@shikijs/rehype/core';
import { createHighlighter } from 'shiki';

let highlighterPromise = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-dark'],
      langs: [
        'javascript', 'typescript', 'jsx', 'tsx',
        'go', 'python', 'bash', 'shell',
        'json', 'yaml', 'sql', 'css', 'html',
        'markdown', 'diff', 'toml',
      ],
    });
  }
  return highlighterPromise;
}

async function transformMarkdown(raw) {
  const { data: frontmatter, content } = matter(raw);
  const highlighter = await getHighlighter();

  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeShikiFromHighlighter, highlighter, {
      theme: 'github-dark',
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  return [
    `export const frontmatter = ${JSON.stringify(frontmatter)};`,
    `export const html = ${JSON.stringify(String(result))};`,
  ].join('\n');
}

export default function blogMarkdown() {
  return {
    name: 'vite-plugin-blog-markdown',
    enforce: 'pre',

    async load(id) {
      const cleanId = id.split('?')[0];
      if (!cleanId.endsWith('.md')) return null;

      const raw = await readFile(cleanId, 'utf-8');
      const code = await transformMarkdown(raw);
      return { code, map: null };
    },
  };
}
