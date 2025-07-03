'use client';

import { PrivacyPolicy } from '@/types/api';
import { formAction } from './action';
import styles from './index.module.scss';
import clsx from 'clsx';
import { useActionState, useState } from 'react';
import { getZodValidateError } from '@/utils/validate';
import { ErrorText } from '@/app/_components/Atoms/ErrorText';
import { TextInput } from '@/app/_components/Atoms/TextInput';
import { ClientMarkdownPreviewTextArea } from '@/app/_components/Molecules/ClientMarkdownPreviewEditor';
import { Button } from '@/app/_components/Atoms/Button';
import { State } from './state';
import { LoadingModal } from '@/app/_components/Molecules/LoadingModal';

type Props = {
  privacyPolicy?: PrivacyPolicy;
};

export const ClientPrivacyPolicyEditor = (props: Props) => {
  const { privacyPolicy } = props;

  const [state, action, isPending] = useActionState<State, FormData>(
    formAction,
    {}
  );

  const nameError = getZodValidateError(state.zodError || [], 'name');
  const contentError = getZodValidateError(state.zodError || [], 'content');

  const [name, setName] = useState<string | undefined>(privacyPolicy?.id);

  return (
    <>
      <form action={action}>
        {state.message && <ErrorText>{state.message}</ErrorText>}
        <div className={clsx(styles.container, styles.verticalContainer)}>
          <div className={clsx(styles.titleArea)}>
            <div className={clsx(styles.horizontalContainer)}>
              <label>タイトル</label>
              <TextInput
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
      <LoadingModal open={isPending} />
    </>
  );
};
