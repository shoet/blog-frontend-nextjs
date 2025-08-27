import { ErrorPage } from "./_components/Organisms/ErrorPage";

export default function NotFound() {
  return (
    <ErrorPage
      statusCode={401}
      title="認証が必要です"
      detail="このページにアクセスするにはログインが必要です。"
    />
  );
}
