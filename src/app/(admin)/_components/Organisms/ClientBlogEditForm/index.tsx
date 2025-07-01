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
  blog?: Blog;
  serverFormAction: (formData: FormData) => Promise<ClientBlogEditFormState>;
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

const PreviewImage = (props: { src?: string }) => {
  if (props.src) {
    return (
      <div>
        <img src={props.src} />
      </div>
    );
  } else {
    return (
      <div>
        <IconUpload size="3x" color="gray" />
        <div className={css.dropzoneDescription}>
          サムネイルに使用する画像をアップロードしてください
        </div>
      </div>
    );
  }
};

export const ClientBlogEditForm = (props: ClientBlogEditFormProps) => {
  const { blog, serverFormAction } = props;

  const {
    state,
    formAction,
    handleEnterTags,
    tags,
    handleDeleteTags,
    handleChangeIsPublic,
    handleUploadThumbnail,
    previewImage,
    handleDropFileInTextArea,
    handleChangeContent,
    contentValue,
    isPublic,
  } = useBlogEditForm({ blog, serverFormAction });

  return (
    <form action={formAction}>
      <input hidden type="text" name="id" defaultValue={blog?.id} />
      <input hidden type="text" name="user_id" defaultValue={blog?.authorId} />
      <div className={css.title}>
        <label htmlFor="title">タイトル</label>
        <TextInput
          placeholder="Title"
          name="title"
          defaultValue={state.title}
        />
        <ValidateError state={state} field="title" />
      </div>
      <Spacer height={16} />
      <div className={css.description}>
        <label htmlFor="description">概要</label>
        <TextArea
          name="description"
          placeholder="Description"
          rows={2}
          maxRows={2}
          defaultValue={state.description}
        />
        <ValidateError state={state} field="description" />
      </div>
      <Spacer height={16} />
      <div className={css.title}>
        <label htmlFor="tags">タグ</label>
        <TagForm
          className={css.tagsForm}
          tags={tags}
          onSubmit={handleEnterTags}
          onClickCloseTag={handleDeleteTags}
        />
      </div>
      <Spacer height={16} />
      <div className={css.thumbnail}>
        <label htmlFor="thumbnail_image_url">サムネイル</label>
        <Dropzone onChange={handleUploadThumbnail}>
          <div className={css.dropzoneContent}>
            <PreviewImage src={previewImage} />
          </div>
          <input
            hidden
            type="text"
            name="thumbnail_image_url"
            defaultValue={state.thumbnailUrl}
            value={previewImage}
          />
        </Dropzone>
      </div>
      <Spacer height={16} />
      <div>
        <label htmlFor="content">記事</label>
        <ClientMarkdownPreviewTextArea
          name="content"
          markdownText={contentValue}
          onDragDrop={handleDropFileInTextArea}
          onChangeText={handleChangeContent}
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
