"use client";
import { useFormState } from "react-dom";
import { Blog } from "@/types/api";
import { useState } from "react";
import { ClientBlogEditFormState } from "./state";
import {
  uploadFileForContent,
  uploadFileForThumbnail,
} from "@/services/routeHandler";

export const useBlogEditForm = (props: {
  blog?: Blog;
  serverFormAction: (formData: FormData) => Promise<ClientBlogEditFormState>;
}) => {
  const { blog, serverFormAction } = props;

  const [tags, setTags] = useState<string[]>(blog?.tags || []);
  const [isPublic, setIsPublic] = useState<boolean>(blog?.isPublic || false);
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    blog?.thumbnailImageFileName,
  );
  const [contentValue, setContentValue] = useState(blog?.content || "");

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

  const handleChangeContent = (content: string) => {
    setContentValue(content);
  };

  /**
   * handleDropFileInTextAreaはDragableTextareaにファイルをドロップしたときに呼ばれる
   */
  const handleDropFileInTextArea = async (file?: File) => {
    // 署名付きアップロード
    if (file === undefined) {
      return;
    }
    // RouteHandler経由で署名付きアップロードを行う
    try {
      const { putURL } = await uploadFileForContent(file);
      console.log("### contentValue");
      console.log(contentValue);
      // contentの末尾にURLを追加する
      const markdonwImageText = `![](${putURL})`;
      setContentValue(contentValue + "\n" + markdonwImageText);
    } catch (e) {
      console.error(e);
      return;
    }
  };

  const [state, formAction] = useFormState(
    async (
      _: ClientBlogEditFormState,
      formData: FormData,
    ): Promise<ClientBlogEditFormState> => {
      formData.append("tags", tags.join(","));
      const state = await serverFormAction(formData);
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
    handleChangeContent,
    contentValue,
    isPublic,
  };
};
