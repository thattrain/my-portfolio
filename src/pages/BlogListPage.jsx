import { useState } from "react";
import { loadAllPosts, getAllTags } from "../utils/blog";
import BlogCard from "../components/BlogCard";
import Footer from "../sections/Footer";

const BlogListPage = () => {
  const allPosts = loadAllPosts();
  const allTags = getAllTags();
  const [activeTag, setActiveTag] = useState("All");

  const filtered =
    activeTag === "All"
      ? allPosts
      : allPosts.filter((p) => p.frontmatter.tags.includes(activeTag));

  return (
    <main className="min-h-screen pt-32 pb-20 px-5 md:px-10">
      <div className="max-w-[700px] mx-auto">
        <div className="mb-12">
          <h1 className="font-semibold md:text-5xl text-3xl text-white mb-4">
            Blog
          </h1>
          <p className="text-white-50 text-lg">
            Notes on backend development, system design, and life.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveTag("All")}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors duration-200 ${
              activeTag === "All"
                ? "bg-white text-black-100"
                : "bg-black-200 text-white-50 hover:bg-black-50"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-1.5 rounded-full text-sm transition-colors duration-200 ${
                activeTag === tag
                  ? "bg-white text-black-100"
                  : "bg-black-200 text-white-50 hover:bg-black-50"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="flex flex-col">
          {filtered.length === 0 ? (
            <p className="text-white-50 text-center py-20">
              No posts found for this tag.
            </p>
          ) : (
            filtered.map((post) => <BlogCard key={post.slug} post={post} />)
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default BlogListPage;
