import { useParams, Link } from "react-router";
import { getPostBySlug, getAdjacentPosts, readingTime } from "../utils/blog";
import MarkdownRenderer from "../components/MarkdownRenderer";
import Footer from "../sections/Footer";

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <main className="min-h-screen pt-32 pb-20 px-5 md:px-10">
        <div className="max-w-[700px] mx-auto text-center">
          <h1 className="font-semibold text-4xl text-white mb-4">
            Post Not Found
          </h1>
          <p className="text-white-50 mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link
            to="/blog"
            className="text-blue-50 hover:text-white transition-colors"
          >
            &larr; Back to blog
          </Link>
        </div>
      </main>
    );
  }

  const { title, date, tags } = post.frontmatter;
  const { prev, next } = getAdjacentPosts(slug);

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen flex flex-col pt-32 pb-20 px-5 md:px-10">
      <article className="max-w-[700px] mx-auto flex-1">
        <Link
          to="/blog"
          className="inline-flex items-center text-[#839cb5] hover:text-white transition-colors mb-8"
        >
          &larr; Back to blog
        </Link>

        <div className="flex gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-[#2d2d38] text-[#839cb5]"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="font-semibold md:text-4xl text-2xl text-white mb-4">
          {title}
        </h1>

        <div className="flex items-center gap-3 text-sm text-[#839cb5] mb-12">
          <time>{formattedDate}</time>
          <span>&middot;</span>
          <span>{readingTime(post.html)}</span>
        </div>

        <MarkdownRenderer html={post.html} />

        <nav className="mt-16 pt-8 border-t border-[#282732] grid grid-cols-2 gap-4">
          <div>
            {prev && (
              <Link to={`/blog/${prev.slug}`} className="group block">
                <span className="text-xs text-[#839cb5] uppercase tracking-wider">
                  Previous
                </span>
                <p className="text-white-50 group-hover:text-white transition-colors mt-1">
                  {prev.frontmatter.title}
                </p>
              </Link>
            )}
          </div>
          <div className="text-right">
            {next && (
              <Link to={`/blog/${next.slug}`} className="group block">
                <span className="text-xs text-[#839cb5] uppercase tracking-wider">
                  Next
                </span>
                <p className="text-white-50 group-hover:text-white transition-colors mt-1">
                  {next.frontmatter.title}
                </p>
              </Link>
            )}
          </div>
        </nav>
      </article>

      <Footer />
    </main>
  );
};

export default BlogPostPage;
