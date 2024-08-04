"use client";
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
import { ClientBlogEditFormState, getClientBlogEditFormError } from "./state";
import { useBlogEditForm } from "./useBlogEditForm";

type ClientBlogEditFormProps = {
  blog: Blog;
};

const ValidateError = (props: {
  state: ClientBlogEditFormState;
  field: string;
}) => {
  const error = getClientBlogEditFormError(props.state, props.field);
  if (error) {
    return <div className={css.error}>{error.error}</div>;
  } else {
    return null;
  }
};

export const ClientBlogEditForm = (props: ClientBlogEditFormProps) => {
  const { blog } = props;

  const { state, formAction } = useBlogEditForm({ blog });

  return (
    <form>
      <div className={css.title}>
        <TextInput placeholder="Title" value={state.title} />
        <ValidateError state={state} field="title" />
      </div>
      <Spacer height={16} />
      <div className={css.description}>
        <TextArea
          className={css.descriptionTextArea}
          placeholder="Description"
          rows={2}
          maxRows={5}
          value={state.description}
        />
        <ValidateError state={state} field="description" />
      </div>
      <Spacer height={16} />
      <div className={css.title}>
        <TagForm className={css.tagsForm} tags={state.tags} />
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
        <ClientMarkdownPreviewTextArea markdownText={state.content} />
        <ValidateError state={state} field="content" />
      </div>
      <Spacer height={16} />
      <div className={css.actionArea}>
        <Button variant="primary">変更を保存する</Button>
      </div>
    </form>
  );
};
