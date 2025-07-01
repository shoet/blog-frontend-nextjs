import { getBlogsAdmin } from "@/services/getBlogsAdmin";
import css from "./page.module.scss";
import { Spacer } from "@/app/_components/Atoms/Spacer";
import Link from "next/link";
import { BlogEditTable } from "@/app/_components/Organisms/BlogEditTable";
import { IconPlus } from "@/app/_components/Atoms/Icon";

const AdminHomePage = async () => {
  const blogs = await getBlogsAdmin({ limit: 10 });
  return (
    <div className={css.page}>
      <Spacer height={20} />
      <div className={css.actionArea}>
        <Link className={css.postButton} href="/admin/blogs/new">
          <span>記事を投稿する</span>
          <IconPlus />
        </Link>
      </div>
      <Spacer height={20} />
      <div className={css.blogList}>
        <BlogEditTable blogs={blogs} />
      </div>
    </div>
  );
};

export default AdminHomePage;
