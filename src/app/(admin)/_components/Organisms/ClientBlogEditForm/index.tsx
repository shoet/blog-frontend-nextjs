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

  const {
    state,
    formAction,
    handleEnterTags,
    tags,
    handleDeleteTags,
    handleChangeIsPublic,
    isPublic,
  } = useBlogEditForm({ blog });

  return (
    <form action={formAction}>
      <input hidden type="text" name="id" value={blog.id} />
      <input hidden type="text" name="user_id" value={blog.authorId} />
      <div className={css.title}>
        <TextInput placeholder="Title" name="title" value={state.title} />
        <ValidateError state={state} field="title" />
      </div>
      <Spacer height={16} />
      <div className={css.description}>
        <TextArea
          name="description"
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
        <TagForm
          className={css.tagsForm}
          tags={tags}
          onSubmit={handleEnterTags}
          onClickCloseTag={handleDeleteTags}
        />
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
          <input
            hidden
            type="text"
            name="thumbnail_image_url"
            value={state.thumbnailUrl}
          />
        </Dropzone>
      </div>
      <Spacer height={16} />
      <div>
        <ClientMarkdownPreviewTextArea
          name="content"
          markdownText={state.content}
        />
        <ValidateError state={state} field="content" />
      </div>
      <Spacer height={16} />
      <div className={css.actionArea}>
        <div className={css.isPublic}>
          <span>記事を公開する</span>
          <input
            type="checkbox"
            name="is_public"
            checked={isPublic}
            value={isPublic ? 1 : 0}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeIsPublic(e.target.checked);
            }}
          />
        </div>
        <Button type="submit" variant="primary">
          変更を保存する
        </Button>
      </div>
    </form>
  );
};
