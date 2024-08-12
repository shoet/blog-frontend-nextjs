import { getBlogsAdmin } from "@/services/getBlogsAdmin";
import { BlogTable } from "../_components/Organisms/BlogTable";
import css from "./page.module.scss";
import { Spacer } from "@/app/_components/Atoms/Spacer";
import Link from "next/link";
import { Button } from "@/app/_components/Atoms/Button";

const AdminHomePage = async () => {
  const blogs = await getBlogsAdmin({ limit: 10 });
  return (
    <div className={css.page}>
      <Spacer height={50} />
      <div className={css.actionArea}>
        <Button variant="primary">
          <Link href="/admin/blogs/new">記事を投稿する</Link>
        </Button>
      </div>
      <Spacer height={30} />
      <BlogTable blogs={blogs} />
    </div>
  );
};

export default AdminHomePage;
