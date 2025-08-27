"use client";
import { ErrorPage } from "./_components/Organisms/ErrorPage";

export default function Page() {
  return (
    <ErrorPage
      statusCode={500}
      title="エラーが発生しました"
      detail="ご不便をおかけして申し訳ありません。しばらく時間をおいてから再度お試しください。"
    />
  );
}
