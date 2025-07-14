"use client";

import type { PrivacyPolicy } from "@/types/api";
import { deleteFormAction, editFormAction } from "./action";
import styles from "./index.module.scss";
import clsx from "clsx";
import { useActionState, useState } from "react";
import { getZodValidateError } from "@/utils/validate";
import { ErrorText } from "@/app/_components/Atoms/ErrorText";
import { TextInput } from "@/app/_components/Atoms/TextInput";
import { ClientMarkdownPreviewTextArea } from "@/app/_components/Molecules/ClientMarkdownPreviewEditor";
import { Button } from "@/app/_components/Atoms/Button";
import type { State } from "./state";
import { LoadingModal } from "@/app/_components/Molecules/LoadingModal";
import { IconTrash } from "@/app/_components/Atoms/Icon";
import { Modal } from "@/app/_components/Molecules/Modal";
import { ConfirmDialog } from "@/app/_components/Molecules/ConfirmDialog";

type Props = {
  privacyPolicy?: PrivacyPolicy;
};

export const ClientPrivacyPolicyEditor = (props: Props) => {
  const { privacyPolicy } = props;

  const [editState, editAction, isPendingEdit] = useActionState<
    State,
    FormData
  >(editFormAction, {});
  const [deleteState, deleteAction, isPendingDelete] = useActionState<
    State,
    FormData
  >(deleteFormAction, {});

  const nameError = getZodValidateError(editState.zodError || [], "name");
  const contentError = getZodValidateError(editState.zodError || [], "content");
  const deleteNameError = getZodValidateError(
    deleteState.zodError || [],
    "name",
  );

  const [name, setName] = useState<string | undefined>(privacyPolicy?.id);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      <form action={editAction}>
        {editState.message && <ErrorText>{editState.message}</ErrorText>}
        <div className={clsx(styles.container, styles.verticalContainer)}>
          <div className={clsx(styles.titleArea)}>
            <div className={clsx(styles.horizontalContainer)}>
              <label htmlFor="name">タイトル</label>
              <TextInput
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {privacyPolicy && (
                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() => setShowDelete(true)}
                >
                  <IconTrash />
                </button>
              )}
            </div>
            {nameError && <ErrorText>{nameError.error}</ErrorText>}
          </div>
          <div className={styles.editorArea}>
            <ClientMarkdownPreviewTextArea
              name="content"
              value={privacyPolicy?.content}
            />
            {contentError && <ErrorText>{contentError.error}</ErrorText>}
          </div>
          <div className={clsx(styles.horizontalContainer, styles.buttonArea)}>
            <Button variant="primary" type="submit">
              保存
            </Button>
          </div>
        </div>
      </form>
      <LoadingModal open={isPendingEdit} />
      <Modal open={showDelete}>
        <form action={deleteAction}>
          <input hidden name="name" defaultValue={privacyPolicy?.id || ""} />
          <ConfirmDialog
            title="削除しますか？"
            onClickOK={() => { }}
            enableSubmit
            onClickCancel={() => setShowDelete(false)}
            errorMessage={deleteState.message || deleteNameError?.error}
          />
        </form>
      </Modal>
    </>
  );
};
