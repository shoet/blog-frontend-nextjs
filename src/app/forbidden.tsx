import { ErrorPage } from "./_components/Organisms/ErrorPage";

export default function Forbidden() {
  return (
    <ErrorPage
      statusCode={403}
      title="アクセスが拒否されました"
      detail="別のページをご覧いただくか、必要な権限をお持ちの場合は再度ログインしてください。"
    />
  );
}
