import { ClientMarkdownPreviewTextArea } from "@/app/_components/Molecules/ClientMarkdownPreviewEditor";
import css from "./index.module.scss";
import { TextInput } from "@/app/_components/Atoms/TextInput";
import { Spacer } from "@/app/_components/Atoms/Spacer";
import { TextArea } from "@/app/_components/Atoms/TextArea";
import { Dropzone } from "@/app/_components/Atoms/Dropzone";
import { IconUpload } from "@/app/_components/Atoms/Icon";
import { TagForm } from "@/app/_components/Molecules/TagForm";
import { Button } from "@/app/_components/Atoms/Button";
import { Blog } from "@/types/api";

type ClientBlogEditFormProps = {
  blog: Blog;
};

export const ClientBlogEditForm = (props: ClientBlogEditFormProps) => {
  const { blog } = props;

  return (
    <form>
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
    </form>
  );
};
