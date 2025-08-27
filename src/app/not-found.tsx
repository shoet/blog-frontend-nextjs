import { ErrorPage } from "./_components/Organisms/ErrorPage";

export default function NotFound() {
  return (
    <ErrorPage
      statusCode={404}
      title="お探しのページが見つかりませんでした"
      detail="あなたのご覧になっていたページからのリンクが無効になっているか、入力されたアドレス(URL)のタイプミスかもしれません。"
    />
  );
}
