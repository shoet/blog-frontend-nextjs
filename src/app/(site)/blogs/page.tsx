import { Badge } from "@/app/_components/Atoms/Badge";
import { IconGitHub } from "@/app/_components/Atoms/Icon";

export default function BlogHomePage() {
  // Todo: ブログの一覧取得
  return (
    <div>
      <Badge backgroundColor="green" color="white" focusColor="darkgreen">
        hoge
      </Badge>
      <IconGitHub focusColor="#7ccca4" size="4x" />
    </div>
  );
}
