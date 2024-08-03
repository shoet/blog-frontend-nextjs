import { getBlogsAdmin } from "@/services/getBlogsAdmin";
import { BlogTable } from "../_components/Organisms/BlogTable";
import css from "./page.module.scss";
import { Spacer } from "@/app/_components/Atoms/Spacer";

const AdminHomePage = async () => {
  const blogs = await getBlogsAdmin({ limit: 10 });
  return (
    <div className={css.page}>
      <Spacer height={50} />
      <BlogTable blogs={blogs} />
    </div>
  );
};

export default AdminHomePage;
