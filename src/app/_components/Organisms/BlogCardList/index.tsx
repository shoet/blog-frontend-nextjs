import { getBlogs } from "@/services/getBlogs";

export const BlogCardList = async () => {
  const response = await getBlogs({ limit: 10 });
  const blogs = response.blogs;
  return (
    <div>
      {blogs.map((b) => {
        return <div key={b.id}>{b.title}</div>;
      })}
    </div>
  );
};