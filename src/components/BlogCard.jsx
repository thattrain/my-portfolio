import { Link } from "react-router";

const BlogCard = ({ post }) => {
  const { title, date, tags, excerpt, thumbnail } = post.frontmatter;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="py-8 border-b border-[#282732] group">
      <div className="flex gap-6">
        {thumbnail && (
          <Link to={`/blog/${post.slug}`} className="shrink-0">
            <img
              src={thumbnail}
              alt={title}
              className="w-32 h-24 object-cover rounded-lg"
            />
          </Link>
        )}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <time dateTime={date} className="text-sm text-[#839cb5]">{formattedDate}</time>
            <div className="flex gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full bg-[#2d2d38] text-[#839cb5]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <Link to={`/blog/${post.slug}`} className="block">
            <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-50 transition-colors duration-200">
              {title}
            </h2>
            <p className="text-white-50 leading-relaxed">{excerpt}</p>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
