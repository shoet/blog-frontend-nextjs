"use client";
import { useFormState } from "react-dom";
import { Blog } from "@/types/api";
import { useState } from "react";
import { ClientBlogEditFormState } from "./state";
import { blogEditSubmitAction } from "./actions";
import { uploadFileForThumbnail } from "@/services/uploadFile";

export const useBlogEditForm = (props: { blog?: Blog }) => {
  const { blog } = props;

  const [tags, setTags] = useState<string[]>(blog?.tags || []);
  const [isPublic, setIsPublic] = useState<boolean>(blog?.isPublic || false);
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    blog?.thumbnailImageFileName,
  );

  /**
   * handleEnterTagsはタグ入力時にEnterを押したときに呼ばれる
   */
  const handleEnterTags = (tag: string) => {
    setTags([...tags, tag]);
  };

  /**
   * handleDeleteTagsはタグのBadgeのXボタンを押したときに呼ばれる
   */
  const handleDeleteTags = (tag: string) => {
    const newTags = tags.filter((t) => {
      return t !== tag;
    });
    setTags(newTags);
  };

  /**
   * handleChangeIsPublicは公開非公開のチェックボックスを変更したときに呼ばれる
   */
  const handleChangeIsPublic = (isPublic: boolean) => {
    setIsPublic(isPublic);
  };

  /**
   * handleUploadThumbnailはDropzoneからサムネイルをドロップしたときに呼ばれる
   */
  const handleUploadThumbnail = async (file?: File) => {
    if (file === undefined) {
      return;
    }
    // RouteHandler経由で署名付きアップロードを行う
    try {
      const { putURL } = await uploadFileForThumbnail(file);
      setPreviewImage(putURL);
    } catch (e) {
      console.error(e);
      return;
    }
  };

  /**
   * handleDropFileInTextAreaはDragableTextareaにファイルをドロップしたときに呼ばれる
   */
  const handleDropFileInTextArea = (file?: File) => {
    // 署名付きアップロード
    console.log("Upload file");
    console.log(file);
    // contentの末尾にURLを追加する
  };

  const [state, formAction] = useFormState(
    async (
      _: ClientBlogEditFormState,
      formData: FormData,
    ): Promise<ClientBlogEditFormState> => {
      // サムネイルのハンドリング TODO
      formData.append("tags", tags.join(","));
      const state = await blogEditSubmitAction(formData);
      return state;
    },
    {
      title: props.blog?.title || "",
      description: props.blog?.description || "",
      thumbnailUrl: props.blog?.thumbnailImageFileName || "",
      tags: tags,
      content: props.blog?.content || "",
      isPublic: isPublic,

      errors: [],
    },
  );

  return {
    state,
    formAction,
    tags,
    handleEnterTags,
    handleDeleteTags,
    handleChangeIsPublic,
    handleUploadThumbnail,
    previewImage,
    handleDropFileInTextArea,
    isPublic,
  };
};
