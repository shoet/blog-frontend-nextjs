import { ClientMarkdownPreviewTextArea } from "@/app/_components/Molecules/ClientMarkdownPreviewEditor";
import { getBlogDetail } from "@/services/getBlogDetail";
import { Metadata, ResolvingMetadata } from "next";
import css from "./page.module.scss";
import { TextInput } from "@/app/_components/Atoms/TextInput";
import { Spacer } from "@/app/_components/Atoms/Spacer";
import { TextArea } from "@/app/_components/Atoms/TextArea";
import { Dropzone } from "@/app/_components/Atoms/Dropzone";
import { IconUpload } from "@/app/_components/Atoms/Icon";
import { TagForm } from "@/app/_components/Molecules/TagForm";
import { Button } from "@/app/_components/Atoms/Button";

type BlogEditPageProps = {
  params: {
    blogId: number;
  };
};

export const generateMetadata = async (
  props: BlogEditPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const { title } = await parent;
  const { blogId } = props.params;
  const blog = await getBlogDetail(blogId);
  return {
    title: `【Edit】${blog.title} | ${title?.absolute}`,
    description: "Edit blog page",
  };
};

const BlogEditPage = async (props: BlogEditPageProps) => {
  const { blogId } = props.params;
  const blog = await getBlogDetail(blogId);
  return (
    <div className={css.page}>
      <div className={css.title}>
        <TextInput placeholder="Title" value={blog.title} />
      </div>
      <Spacer height={16} />
      <div className={css.description}>
        <TextArea
          className={css.descriptionTextArea}
          placeholder="Description"
          rows={2}
          maxRows={5}
          value={blog.description}
        />
      </div>
      <Spacer height={16} />
      <div className={css.title}>
        <TagForm className={css.tagsForm} tags={blog.tags || []} />
      </div>
      <Spacer height={16} />
      <div className={css.thumbnail}>
        <Dropzone>
          <div className={css.dropzoneContent}>
            <IconUpload size="3x" color="gray" />
            <div className={css.dropzoneDescription}>
              サムネイルに使用する画像をアップロードしてください
            </div>
          </div>
        </Dropzone>
      </div>
      <Spacer height={16} />
      <div>
        <ClientMarkdownPreviewTextArea markdownText={blog.content} />
      </div>
      <Spacer height={16} />
      <div className={css.actionArea}>
        <Button variant="primary">変更を保存する</Button>
      </div>
    </div>
  );
};

export default BlogEditPage;
